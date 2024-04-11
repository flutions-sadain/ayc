// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABiDyVvZZiquyUWshuBTtUMISYOl3kIfc",
    authDomain: "aycyourself.firebaseapp.com",
    projectId: "aycyourself",
    storageBucket: "aycyourself.appspot.com",
    messagingSenderId: "5502431960",
    appId: "1:5502431960:web:0b3cfba5159fe137e25dad",
    measurementId: "G-DSSGPYHQE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app, "aycymain");
