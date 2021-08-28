import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch()

  // Guardando la nota seleccionada (activa)
  const {active: note} = useSelector(state => state.notes)
  /**
   * Nuestro Use Form, tiene aqui un problema, y es debido a que maneja el estado de una nota
   * Y cuando nosotros seleccionamos otra nota distinta, esa nota no va a cambiar el estado actual 
   * de nuestro useForm, debido a que este maneja su propio estado, por ende, debemos usar el reset del
   * useForm, para darle mas flexibilidad y cambialo cuando cambia la nota, para ello
   * 1. Usar un useEffect
   * 2. Mirar la linea 6 y 7 del useForm
   * 3. Usar el useRef, para generar un observable, que este comparando la nota activa con la que cambio
   */
  const [formValues, handleInputChange, reset] = useForm(note);
  const {body, title} = formValues;

  const activeId = useRef(note.id)

  useEffect(() => {
    
    if( note.id !== activeId.current ){ // Si cambia el id de la nota, entonces la resetea
      reset( note )
      activeId.current = note.id // Si cambia, se establece la nueva nota activa, (esto evita el ciclo infinito)
    }

  }, [note, reset])

  // Observable para actualizar la nota activa en el store, ya que cuando se escribe, no se actualiza
  useEffect(() => {
    dispatch( activeNote(formValues.id, {...formValues}) )

  },[formValues, dispatch])

  return (
    <div className="notes__main-content-">

      <NotesAppBar />

      <div className="notes__content">
        <input 
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name = "title"
          value = {title}
          onChange = { handleInputChange }
        />

        <textarea
          placeholder="What happend today"
          className="notes__textarea"
          name = "body"
          value = {body}
          onChange = { handleInputChange }
        ></textarea>

        {
          (note.url) &&
          <div className="notes__image">
            <img
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/130238819/original/d4096d4950eba421600f21c6c753c19375222eb6/draw-you-a-landscape-image-with-ms-paint.png"
              alt="Una imagen"
            />
          </div>
        }
      </div>

    </div>
  )
}
