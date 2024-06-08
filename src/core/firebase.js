// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from 'firebase/database';
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAr_04e9S5kS8CS8tn4qFq_Cr0hXLF9dU8",
    authDomain: "mednow-4be7a.firebaseapp.com",
    databaseURL: "https://mednow-4be7a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mednow-4be7a",
    storageBucket: "mednow-4be7a.appspot.com",
    messagingSenderId: "119362073723",
    appId: "1:119362073723:web:357f1cef947c04507e9ede",
    measurementId: "G-E6CR85YBM3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

