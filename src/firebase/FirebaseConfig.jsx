// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNqVPCH4GKFiGL-c6ZUBWuTc2_3shOcGA",
  authDomain: "patwa-bartan-ecommerce.firebaseapp.com",
  projectId: "patwa-bartan-ecommerce",
  storageBucket: "patwa-bartan-ecommerce.appspot.com",
  messagingSenderId: "936997690496",
  appId: "1:936997690496:web:1f69782c90395ef56bda65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB=getFirestore(app);
const auth =getAuth(app);

export {fireDB,auth}