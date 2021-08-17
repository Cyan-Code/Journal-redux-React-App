import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducer';

const reducers = combineReducers({ // cuando queramos añadir una nueva funcionalidad, añadimos aqui el nuevo reducer
  auth: authReducer /* de la propiedad auth, se hara cargo el authReducer */
})

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) // solo recibe un reducer
// El store, se necesita importar en el lado mas grande de la app, para que siempre sepa la app, en donde esta la info