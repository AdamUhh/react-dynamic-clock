import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7w4AAUmLH-t3SWSwqxNr21G15hUwKqKY",
    authDomain: "dynamic-clock.firebaseapp.com",
    projectId: "dynamic-clock",
    storageBucket: "dynamic-clock.appspot.com",
    messagingSenderId: "565550574595",
    appId: "1:565550574595:web:83f0a5bec57d700c963236"
};
// const app = firebase.initializeApp({
//     // apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//     // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//     // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
