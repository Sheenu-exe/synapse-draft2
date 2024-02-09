// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADycMtHJAEDvgIKEGsEfbcvMHd0jo27Ic",
  authDomain: "synapse-4e01e.firebaseapp.com",
  projectId: "synapse-4e01e",
  storageBucket: "synapse-4e01e.appspot.com",
  messagingSenderId: "1057711779575",
  appId: "1:1057711779575:web:580c15f8508bca3b3badf2",
  measurementId: "G-EJLPG7TQ51"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =getFirestore();