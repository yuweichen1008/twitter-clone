// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firebase"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-50128.firebaseapp.com",
  projectId: "twitter-clone-50128",
  storageBucket: "twitter-clone-50128.appspot.com",
  messagingSenderId: "424803028341",
  appId: "1:424803028341:web:c4f68e826d4f2ff205573c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db  = getFirestore()
const storage = getStorage()

export{ app, db, storage };
