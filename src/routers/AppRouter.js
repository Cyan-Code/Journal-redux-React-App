import { firebase } from '../firebase/firebase-config';
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { useDispatch } from 'react-redux';

import { JournnalScreen } from '../components/journal/JournnalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';

export const AppRouter = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {

      if( user?.uid ){
        dispatch( login(user.uid, user.displayName))
      }
    
    })
  }, [dispatch])

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component = { AuthRouter }/>

          <Route exact path="/" component = { JournnalScreen }/>
          <Redirect to = "/auth/login"/>
        </Switch>
      </div>
    </Router>
  )
}
