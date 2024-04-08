// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB36YJ-aJTd7OOFA_yWfjM-iH86KdZ9Pbc",
  authDomain: "react-cursos-b8a96.firebaseapp.com",
  projectId: "react-cursos-b8a96",
  storageBucket: "react-cursos-b8a96.appspot.com",
  messagingSenderId: "174956217284",
  appId: "1:174956217284:web:f0cf7ab6aad01dd2049a91"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FirebaseApp);
export const FireBaseDB = getFirestore(FirebaseApp);