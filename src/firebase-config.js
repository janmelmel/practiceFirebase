import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAKbl1k6Xm9tpgKIY9yqT2p_0QKYTYeg-k",
    authDomain: "practicefirebase-f18cf.firebaseapp.com",
    projectId: "practicefirebase-f18cf",
    storageBucket: "practicefirebase-f18cf.appspot.com",
    messagingSenderId: "1080256066736",
    appId: "1:1080256066736:web:04c116b3775d6bb68b7775",
    measurementId: "G-XMKTQRHLN5"
  };
  

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);