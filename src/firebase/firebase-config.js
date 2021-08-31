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

const firebaseConfigTesting = {
  apiKey: "AIzaSyAQrjRa0O4g7OfmkEPYH2jWs6Py_k8SM6c",
  authDomain: "test-journal-app-a3ed2.firebaseapp.com",
  projectId: "test-journal-app-a3ed2",
  storageBucket: "test-journal-app-a3ed2.appspot.com",
  messagingSenderId: "1031530273819",
  appId: "1:1031530273819:web:bccb41975a74a2db4e2cbe"
};

if( process.env.NODE_ENV === 'test' ) {
  firebase.initializeApp(firebaseConfigTesting);
} else {
  firebase.initializeApp(firebaseConfig);
}



const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
  db,
  googleAuthProvider,
  firebase
}
