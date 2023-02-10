// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBKmItYuCBNzwpUCCMmd9bGWEijtR0VPzQ",
  authDomain: "nagp-demo-56e77.firebaseapp.com",
  databaseURL: "https://nagp-demo-56e77-default-rtdb.firebaseio.com",
  projectId: "nagp-demo-56e77",
  storageBucket: "nagp-demo-56e77.appspot.com",
  messagingSenderId: "937707635917",
  appId: "1:937707635917:web:44be4b1e557b540faa9584",
  measurementId: "G-ZBQ8PRKJQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);