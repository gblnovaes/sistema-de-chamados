import firebase from 'firebase/app';

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: process.env.REACT_FIREBASE_APIKEY,
    authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_FIREBASE_APP_ID,
    measurementId: process.env.REACT_FIREBASE_MEASUREMENT_ID,
  };


  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;