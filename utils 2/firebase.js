// import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi_l6NJktQStopz7Duf1NIGJykcE_M5qU",
  authDomain: "hack-mit-15c9e.firebaseapp.com",
  projectId: "hack-mit-15c9e",
  storageBucket: "hack-mit-15c9e.appspot.com",
  messagingSenderId: "711825119945",
  appId: "1:711825119945:web:0f5790aa5e125e1d590b18",
  measurementId: "G-VL28GWYRPK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
