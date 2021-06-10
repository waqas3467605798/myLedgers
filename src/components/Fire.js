import firebase from 'firebase/app'
import 'firebase/database'



var firebaseConfig = {
    apiKey: "AIzaSyCRKceXGhdhpKFQiAJ2Qgkb1wXgXbI36RQ",
    authDomain: "ngrpractice.firebaseapp.com",
    projectId: "ngrpractice",
    storageBucket: "ngrpractice.appspot.com",
    messagingSenderId: "384804225359",
    appId: "1:384804225359:web:d1c84f17b1de731c99853a",
    measurementId: "G-NKKRC8FGHL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


export default firebase;