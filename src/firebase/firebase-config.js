import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCXYn9DLBM2iM5mSTWtQn9IA2J-UdHE22s",
  authDomain: "react-app-courses-ad4d8.firebaseapp.com",
  projectId: "react-app-courses-ad4d8",
  storageBucket: "react-app-courses-ad4d8.appspot.com",
  messagingSenderId: "560727922473",
  appId: "1:560727922473:web:aa3a246182ee3cd7ac8938"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
  db,
  googleAuthProvider,
  firebase
}
