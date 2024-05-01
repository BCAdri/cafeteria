// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    /*apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID*/
  apiKey: "AIzaSyBCeWYy-fkBrqGE7j_zHSIt9ypXcCYTQ9w",
  authDomain: "simcafs.firebaseapp.com",
  projectId: "simcafs",
  storageBucket: "simcafs.appspot.com",
  messagingSenderId: "61247081417",
  appId: "1:61247081417:web:618d8c2d890b79094b7618",
  measurementId: "G-E96M72YLQB"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
