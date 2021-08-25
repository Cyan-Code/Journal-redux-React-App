import { firebase } from '../firebase/firebase-config';
import React, { useEffect, useState } from 'react'
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

  const dispatch = useDispatch();

  const [cheking, setCheking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Variable de usar para saber si se esta logeado

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {

      if( user?.uid ){
        dispatch( login(user.uid, user.displayName))
        setIsLoggedIn(true) // Logeado
      } else {
        setIsLoggedIn(false) // No logeado
      }
      setCheking(false)
    })
  }, [dispatch, setCheking])

  if(cheking) {
    return (
      <h1>Espere . . .</h1>
    )
  }

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
