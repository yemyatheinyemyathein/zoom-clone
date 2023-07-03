// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5dwPXp8xiROEwjd5rug4pxSCon8dCkGg",
  authDomain: "zoom-clone-cd345.firebaseapp.com",
  projectId: "zoom-clone-cd345",
  storageBucket: "zoom-clone-cd345.appspot.com",
  messagingSenderId: "271254952223",
  appId: "1:271254952223:web:1a8f73add7097c79a7382a",
  measurementId: "G-ZH7W7VDFYF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
export const userRef = collection(firebaseDB, "users");
export const meetingRef = collection(firebaseDB, "meetings");
