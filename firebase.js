// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARDXLA6Ytc5brn8ilKok-K68WQGdRHwLE",
  authDomain: "vidyapurtigpt.firebaseapp.com",
  projectId: "vidyapurtigpt",
  storageBucket: "vidyapurtigpt.firebasestorage.app",
  messagingSenderId: "289897227196",
  appId: "1:289897227196:web:181a5b8d170df0e9fc41b9",
  measurementId: "G-Q6430ZJD82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
