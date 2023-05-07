import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwuPP1OJhUEpqwxLywkklKebrP_Fm4mrU",
  authDomain: "house-market-6d352.firebaseapp.com",
  projectId: "house-market-6d352",
  storageBucket: "house-market-6d352.appspot.com",
  messagingSenderId: "226907222691",
  appId: "1:226907222691:web:62ce799a8cbc45a90ec516"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()