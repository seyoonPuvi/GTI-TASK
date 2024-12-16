// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2jBy61Zlrd1d8sE77XRxib1SGNjUzFlM",
  authDomain: "gti-task.firebaseapp.com",
  projectId: "gti-task",
  storageBucket: "gti-task.firebasestorage.app",
  messagingSenderId: "129497970510",
  appId: "1:129497970510:web:27ee2a54584dc7cf9f101f",
  measurementId: "G-HHE1TG3F79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
