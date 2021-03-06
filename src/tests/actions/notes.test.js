/*** @jest-environment node */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startNewNote, startSaveNote, startUpLoading } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { fileUpload } from '../../helpers/fileUpload'
import { types } from '../../types/types'

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn( () => {
    return Promise.resolve('https://hola-mundo.com/cosa.jpg')
  })
}))

const middlewares = [thunk] //estamos usando thunk
const mockStore = configureStore(middlewares)

global.scrollTo = jest.fn();

const initState = {
  auth: {
    uid: 'TESTING'
  },
  notes: {
    active: {
       id: '1Hsoh0zDLaKl9pp6xBIE',
       title: 'Hola',
       body: 'Mundo'
    }
  }
}

let store = mockStore( // aqui se configura el store, en un determinado punto
  /**
   * Es decir, si para nuestra app, tenemos un determinado store, con determinados
   * estados, debemos tenerlos aqui, creando un store sintetico
   */
  initState
)


describe('Pruebas con las acciones de notes', () => {

  afterAll(() => {
    db.terminate()
  })

  beforeEach( () => {
    store.clearActions()
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

  test('Deben de cargarse las notas', async () => {
    await store.dispatch( startNewNote('TESTING') );
    const actions = store.getActions();

    expect( actions[1] ).toEqual({
      type: types.notesLoad,
      payload: expect.any(Object)
    })

    /* const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(String)
    }

    expect( actions[0].payload[0] ).toMatchObject(expected) */

  })

  test('Debe de actualizar la nota', async () => {
    
    const note = {
      id: '8Ixlrz0xdRQgPENef6n5',
      title: 'Titulo',
      body: 'body'
    }

    await store.dispatch( startSaveNote(note))
    const actions = store.getActions();
    
    expect( actions[0].type ).toBe( types.notesUpdated )

    const doc = await db.doc(`TESTING/journal/notes/${ note.id }`).get();

    expect( doc.data().title ).toBe( note.title )

  })
  
  test('Start Uploading, debe de actualizar el URL de entrie', async () => {
    
    const file = new File([], 'foto.jpg') // Aqui hay un error por que jest no deja pasar un file erroneo, por el comentario en la linea 1
                                          // Sin embargo, se puede crear un archivo independiente para hacerlo
    await store.dispatch( startUpLoading(file) )

    const docRef = await db.doc('/TESTING/journal/notes/1Hsoh0zDLaKl9pp6xBIE').get()

    expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg')

  })
  

})

