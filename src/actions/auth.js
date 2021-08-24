import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import { types } from "../types/types"
import {startLoading, finishLoading} from '../actions/uiState';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch( startLoading() )
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( async ({ user })=>{
        await dispatch( login(user.uid, user.displayName) )
        dispatch(finishLoading())
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading())
      })
    }
}

export const startGoogleLogin = () => {
  return (dispatch) => {

    firebase.auth().signInWithPopup( googleAuthProvider )
      .then(({user}) => {
        dispatch(
          login(user.uid, user.displayName)
        )
      })
  }
}

export const startRegisterEmailPassword = (email, password, name) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async ({user})=>{
        await user.updateProfile({displayName: name})
        dispatch(
          login(user.uid, user.displayName)
        )
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
      uid,
      displayName
    }
  }
)

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut()
    
    dispatch( logout() )
  }
}

export const logout = () => ({
  type: types.logout
})