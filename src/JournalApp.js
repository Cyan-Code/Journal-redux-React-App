import React from 'react'
import { Provider } from 'react-redux'; // esta es la importacion del store por medio del provider

import { AppRouter } from './routers/AppRouter'
import { store } from './store/store';


export const JournalApp = () => {
  return (
    <Provider store = { store }>
      <AppRouter />
    </Provider>
  )
}
