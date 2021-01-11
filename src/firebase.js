import firebase from "firebase";

const firebaseConfig = firebase.initializeApp ({
  apiKey: "AIzaSyBK6t82CZxacdz9UU1bLBryeodYfe2bJuk",
  authDomain: "petsocial-15da6.firebaseapp.com",
  databaseURL: "https://petsocial-15da6-default-rtdb.firebaseio.com",
  projectId: "petsocial-15da6",
  storageBucket: "petsocial-15da6.appspot.com",
  messagingSenderId: "2510389616",
  appId: "1:2510389616:web:130339ad1366680bdc0fb5"
  });

  const db= firebaseConfig.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage};