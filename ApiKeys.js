import * as firebase from 'firebase';

let FirebaseConfig = { 
    apiKey: "AIzaSyCLleAFmhV0Gsli2vKgaOdfir9KX8O4Uls",
    authDomain: "singingproject-8a562.firebaseapp.com",
    databaseURL: "https://singingproject-8a562.firebaseio.com",
    projectId: "singingproject-8a562",
    storageBucket: "singingproject-8a562.appspot.com",
    messagingSenderId: "544207023546",
    appId: "1:544207023546:web:14a010d79c20b5e4808183",
    measurementId: "G-3KXE07X04J"
};

firebase.initializeApp(FirebaseConfig);
console.log('firebase initialized');
export default firebase;