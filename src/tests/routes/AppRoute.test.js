import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { firebase } from '../../firebase/firebase-config';


import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';


jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initState = {
  auth: {},
  ui:{
    loading: false,
    msgError: null
  },
  notes:{
    active: {
      id:'ABC'
    },
    notes:[]
  }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas sobre el componente <AppRouter />', () => {

  test('Debe de llamar al loading si estoy autenticado', async () => {
    
    let user;
    
    await act( async () => {
      const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456') // llamado del enviroment de pruebas
      user = userCred.user

      const wrapper = mount(
        <MemoryRouter>
          <Provider store={ store } >
            <AppRouter />
          </Provider>
        </MemoryRouter>
      )
    })
    expect(login).toHaveBeenCalledWith('9ioHH2WUG7gu23RE8ArgM1xqBaY2', null)
  })
  

})


