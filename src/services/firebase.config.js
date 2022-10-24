import firebase from 'firebase/app';

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


// const firebaseConfig = {
//     apiKey: process.env.REACT_FIREBASE_APIKEY,
//     authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_FIREBASE_MESSAGE_SENDER_ID,
//     appId: process.env.REACT_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_FIREBASE_MEASUREMENT_ID,
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAw2YOumioXqyFGaCmA1jtm8oVByXiD3-0",
  authDomain: "sistema-de-chamados-9b191.firebaseapp.com",
  projectId: "sistema-de-chamados-9b191",
  storageBucket: "sistema-de-chamados-9b191.appspot.com",
  messagingSenderId: "599055513286",
  appId: "1:599055513286:web:60aa580aaa60545f48c9c7",
  measurementId: "G-76EDG5GRLC"
};


  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;