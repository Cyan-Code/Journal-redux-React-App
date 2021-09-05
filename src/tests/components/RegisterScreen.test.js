import React from 'react';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { mount } from "enzyme"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { RegisterScreen } from "../../components/auth/RegisterScreen"
import { types } from '../../types/types';

const initState = {
  auth: {},
  ui:{
    loading: false,
    msgError: null
  }
}

const middlewares = [thunk] //estamos usando thunk
const mockStore = configureStore(middlewares)

let store = mockStore(initState)


const wrapper = mount(
  <MemoryRouter>
    <Provider store = { store }>
      <RegisterScreen/>
    </Provider>
  </MemoryRouter>
)

describe('Pruebas en el componente <RegisterScreen />', () => {
  
  test('Debe de mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot();
  })

  test('Debe de hacer el dispatch de la accion respectiva', () => {
    const emailFiled = wrapper.find('input[name="email"]')
    emailFiled.simulate('change', {
      target:{
        value:'',
        name:'email'
      }
    })
    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    })
    const actions = store.getActions()
    
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not Valid'
    })
  })

  test('Debe de mostrar la caja de lalerta con el error', () => {

    const initState2 = {
      auth: {},
      ui:{
        loading: false,
        msgError: 'Email incorrecto'
      }
    }
    const store2 = mockStore(initState2)
    const wrapper = mount(
      <MemoryRouter>
        <Provider store = { store2 }>
          <RegisterScreen/>
        </Provider>
      </MemoryRouter>
    );

    expect( wrapper.find('.auth__aler-error').exists() ).toBe(true)
    expect( wrapper.find('.auth__aler-error').text().trim() ).toBe(initState2.ui.msgError)
    
  })
  


})


