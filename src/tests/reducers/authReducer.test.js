import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas sobre el authReducer', () => {

  test('Debe de retornar los estados por defecto', () => {
    const state = authReducer({}, '')
    expect( state ).toEqual({})
  })

  test('Debe de autenticarme', () => {
    const newAuth = {
      type: types.login,
      payload: {
        uid: 123456,
        displayName: 'Fernando'
      }
    }
    const state = authReducer({}, newAuth)
    expect( state ).toEqual({
      uid: 123456,
      name: 'Fernando'
    }) 
  })
  
  test('Debe de purgar el state', () => {
    const newAuth = {
      type: types.logout
    }
    const state = authReducer({uid: 123, displayName:'Luis'}, newAuth)
    expect( state ).toEqual({})
  })
  
  
})

