import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
  return async (dispatch, getState) => {
    // Grabar en FireStore
    const uid = getState().auth.uid;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    //Referencia a la base de datos del fireStore.config
    // Espera a que se haga la inserccion
    const doc = await db.collection(`${uid}/journal/notes`).add( newNote )

    // enviando el documento con el id proveido por firebase al dispatch
    dispatch( activeNote( doc.id, newNote ) )


  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload:{
    id,
    ...note
  }
})

export const setarLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid)
    dispatch( setNotes(notes) )
    console.log(notes);
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})
