// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7y3Mhn3LwhH5FKfeqdElEU3fHSLxhdk4",
  authDomain: "zionlogy-4b6e6.firebaseapp.com",
  projectId: "zionlogy-4b6e6",
  storageBucket: "zionlogy-4b6e6.appspot.com",
  messagingSenderId: "620982867848",
  appId: "1:620982867848:web:50fd0bf64116facbdf0c3d",
  measurementId: "G-SYTBRFFJM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);