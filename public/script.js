// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx3zsGYBBiL_07FMegzZCFBYYANFw7TDQ",
  authDomain: "drar-writers.firebaseapp.com",
  projectId: "drar-writers",
  storageBucket: "drar-writers.appspot.com",
  messagingSenderId: "805962540443",
  appId: "1:805962540443:web:4021ddeb7b75e19d9e2d3e",
  measurementId: "G-6N69W2TCLY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
