import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

import '@testing-library/jest-dom'

import { LoginScreen } from "../../components/auth/LoginScreen"
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk] //estamos usando thunk
const mockStore = configureStore(middlewares)

global.scrollTo = jest.fn();

const initState = {
  auth: {},
  ui:{
    loading: false,
    msgError: null
  }
}

let store = mockStore(initState)
store.dispatch = jest.fn()

describe('Pruebas sobre el componente <LoginScreen />', () => {
  
  beforeEach( () => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  const wrapper = mount(
    <MemoryRouter>
      <Provider store={ store } >
        <LoginScreen />
      </Provider>
    </MemoryRouter>
  )

  test('Debe de regresar el componente correctamente', () => {

    expect( wrapper ).toMatchSnapshot();

  });

  test('Debe de disparar la accion de StartGoogleScream', () => {
    wrapper.find('.google-btn').prop('onClick')()
    expect(startGoogleLogin).toHaveBeenCalled()
  })

  test('Debe de disparar la accion de startLogin', () => {
    wrapper.find('form').prop('onSubmit')(
      {preventDefault(){}}
    )
    const test = {
      email: '',
      password: ''
    }
    expect(startLoginEmailPassword).toHaveBeenLastCalledWith(test.email, test.password)
  })
})


