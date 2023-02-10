importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBKmItYuCBNzwpUCCMmd9bGWEijtR0VPzQ",
    authDomain: "nagp-demo-56e77.firebaseapp.com",
    databaseURL: "https://nagp-demo-56e77-default-rtdb.firebaseio.com",
    projectId: "nagp-demo-56e77",
    storageBucket: "nagp-demo-56e77.appspot.com",
    messagingSenderId: "937707635917",
    appId: "1:937707635917:web:44be4b1e557b540faa9584",
    measurementId: "G-ZBQ8PRKJQ4"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('notificationclick', function (event) {
    const url = 'https://nagp-demo-56e77.web.app/'
    event.notification.close()
})

messaging.onBackgroundMessage(payload => {
    const title = payload.data.title
    const notification = self.registration.showNotification(title, {
        body: payload.data.body
    })
})