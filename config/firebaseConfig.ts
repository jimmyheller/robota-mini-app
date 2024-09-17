// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHQBWAXpu08eOxDM356clQkTD2DNROSA0",
  authDomain: "robota-mini-app.firebaseapp.com",
  databaseURL: "https://robota-mini-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "robota-mini-app",
  storageBucket: "robota-mini-app.appspot.com",
  messagingSenderId: "84875057586",
  appId: "1:84875057586:web:ba9e1ab7c1cfb5d9f4acab",
  measurementId: "G-98ZX2NF359"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);