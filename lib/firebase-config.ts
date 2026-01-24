// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDgv6k9_IUZ3Jm_1abg9Iwbr3FHO0btRHY",

  authDomain: "p2p-chess-df689.firebaseapp.com",

  projectId: "p2p-chess-df689",

  storageBucket: "p2p-chess-df689.firebasestorage.app",

  messagingSenderId: "327254571905",

  appId: "1:327254571905:web:952845ec5a217bdc298680",

  measurementId: "G-V1LFQL333K",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
