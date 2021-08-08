import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { JournnalScreen } from '../components/journal/JournnalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
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
