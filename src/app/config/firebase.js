import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDKaZqUtusc6bsQl0ZLclpy4VzGiwS8aHU",
    authDomain: "przeprzepisy-18a4c.firebaseapp.com",
    databaseURL: "https://przeprzepisy-18a4c.firebaseio.com",
    projectId: "przeprzepisy-18a4c",
    storageBucket: "przeprzepisy-18a4c.appspot.com",
    messagingSenderId: "303441026038",
    appId: "1:303441026038:web:db134422b0f13b312345d7"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;

