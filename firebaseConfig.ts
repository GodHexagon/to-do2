// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEKfdpOsOqqGYocFeTg3LPlJR3Ud1VW2o",
  authDomain: "t-todo-e7504.firebaseapp.com",
  projectId: "t-todo-e7504",
  storageBucket: "t-todo-e7504.appspot.com",
  messagingSenderId: "674345128068",
  appId: "1:674345128068:web:7e78dd2ced8d430d9932d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
