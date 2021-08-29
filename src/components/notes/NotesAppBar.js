import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpLoading } from '../../actions/notes'

export const NotesAppBar = () => {

  const dispatch = useDispatch()
  const {active} = useSelector(state => state.notes)

  const handleSaveNote = () => {
    dispatch( startSaveNote(active) )
  }

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if( file ) {
      dispatch( startUpLoading( file ) )
    }
  }

  return (
    <div className="notes__appbar">
      <span>lo que sea</span>

      <input
        id="fileSelector"
        type="file"
        style={{display:'none'}}
        name="file"
        onChange = { handleFileChange }
      />

      <div>
        <button
          className="btn"
          onClick = {handlePictureUpload}
        >
          Picture
        </button>

        <button
          className="btn"
          onClick = {handleSaveNote}
        >
          save
        </button>
      </div>
      
    </div>
  )
}
