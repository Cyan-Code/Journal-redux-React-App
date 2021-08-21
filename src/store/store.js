import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({ // cuando queramos añadir una nueva funcionalidad, añadimos aqui el nuevo reducer
  auth: authReducer, /* de la propiedad auth, se hara cargo el authReducer */
  ui: uiReducer
})

export const store = createStore(
  reducers,
  composeEnhancers( 
    applyMiddleware( thunk )
  )
) // solo recibe un reducer
// El store, se necesita importar en el lado mas grande de la app, para que siempre sepa la app, en donde esta la info