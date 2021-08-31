/*** @jest-environment node */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startNewNote } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { types } from '../../types/types'
 
const middlewares = [thunk] //estamos usando thunk
const mockStore = configureStore(middlewares)

const store = mockStore({ // aqui se configura el store, en un determinado punto
  /**
   * Es decir, si para nuestra app, tenemos un determinado store, con determinados
   * estados, debemos tenerlos aqui, creando un store sintetico
   */
  auth: {
    uid: 'TESTING'
  }

})

describe('Pruebas con las acciones de notes', () => {

  afterAll(() => {
    db.terminate()
  })
  
  test('Debe crear una nueva nota startNewNote', async () => {
    
    await store.dispatch( startNewNote() ); // aqui, ya disparamos la accion

    const actions = store.getActions(); // tomar las acciones disparadas, es un arreglo con las acciones que contienen el payload

    expect( actions[0] ).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })

    expect( actions[1] ).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })
    // docId .... action ... payload .... id
    const docId = actions[0].payload.id
    await db.doc(`TESTING/journal/notes/${docId}`).delete()

  })

})

