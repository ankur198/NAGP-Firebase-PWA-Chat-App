// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFunctions, httpsCallable } from "firebase/functions";
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

const messaging = getMessaging(app)
const addDeviceToFCM = httpsCallable(getFunctions(), 'addDeviceToFCM')
const registerUser = async () => {
  const token = await getToken(messaging, { vapidKey: "BOoGH3AiIxgRs_mDB9zXKOkcMCT0gFbdEtzXxbZsqMipfYrN5cmD5LIhEqeqWmt_uCTgVja-TsjQ0gjTTXiyVOc"  })
  console.log(token)
  await addDeviceToFCM({token})
  console.log('added to fcm')
}

registerUser()

onMessage(messaging, message=> {
  console.log(message.notification)
})