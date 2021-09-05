import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom'

import { Sidebar } from '../../../components/journal/Sidebar';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn()
}))

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn()
}))


const middlewares = [thunk] //estamos usando thunk
const mockStore = configureStore(middlewares)

const initState = {
  auth: {},
  ui:{
    loading: false,
    msgError: null
  },
  notes: {
    active: {
        id: 'ABC',
    },
    notes: []
  }
}

let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <MemoryRouter>
    <Provider store = {store} >
      <Sidebar />
    </Provider>
  </MemoryRouter>
)

describe('Pruebas en <Sidebar />', () => {
  test('Debe de mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot()    
  })

  test('Debe de llamar el logout', () => {
    wrapper.find('.btn').prop('onClick')()
    expect(startLogout).toHaveBeenCalled()
  })

  test('Debe de llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')()
    expect(startNewNote).toHaveBeenCalled()
  })
  
})
