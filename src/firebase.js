// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmTINByg19YASPKr3kmZGoLn5ZtLuBf1Y",
  authDomain: "to-delete-ea93b.firebaseapp.com",
  projectId: "to-delete-ea93b",
  storageBucket: "to-delete-ea93b.appspot.com",
  messagingSenderId: "684577156504",
  appId: "1:684577156504:web:95bb138fb5ff07f4ab0fed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)