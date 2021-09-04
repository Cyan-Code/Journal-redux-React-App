import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

import '@testing-library/jest-dom'

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from "../../types/types"



const middlewares = [thunk] //estamos usando thunk
const mockStore = configureStore(middlewares)

global.scrollTo = jest.fn();

const initState = {}

let store = mockStore(
  initState
)

describe('Pruebas con las acciones de autenticacion', () => {

  beforeEach( () => {
    store = mockStore(initState)
  })
  
  test('Login y logOut deben crear la accion respectiva', () => {
    
    const mockUser = {
      uid: '123456',
      email: 'Luis'
    }

    const actionIn = login(mockUser.uid, mockUser.email)
    const actionOut  = logout()

    expect(actionIn.payload).toMatchObject({
      uid: '123456',
      displayName: 'Luis'
    })

    expect(actionOut).toEqual({type: types.logout})
  })

  test('Debe de realizar el startLogOut', async () => {
    
    await store.dispatch( startLogout() );

    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.logout
    })
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    })
    

  })

  test('Debe de logearse con email y password', async () => {
    await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') )

    const actions = store.getActions()
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: null
      }
    })
  })
  
  
  

})

