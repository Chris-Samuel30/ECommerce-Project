import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAtqSWqhfpa7NLbTbkF9X36LH2ETvxo1I4",
    authDomain: "e-commerce-project-31870.firebaseapp.com",
    projectId: "e-commerce-project-31870",
    storageBucket: "e-commerce-project-31870.appspot.com",
    messagingSenderId: "62081970491",
    appId: "1:62081970491:web:57544ba136552a408c871e"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};