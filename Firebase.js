// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRfXu24HGrUlxNMvZ49zshmg0R71pVUGA",
  authDomain: "garbage-vehicle-monitoring.firebaseapp.com",
  projectId: "garbage-vehicle-monitoring",
  storageBucket: "garbage-vehicle-monitoring.appspot.com",
  messagingSenderId: "962847874576",
  appId: "1:962847874576:web:b0c57b27c3d1abcd0c7495",
  measurementId: "G-ME3L4FFW77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);