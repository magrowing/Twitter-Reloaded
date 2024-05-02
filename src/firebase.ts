
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCDbSBiYvNrGrthOwt_s9u6kIgqyVM88zc",
  authDomain: "twitter-reloaded-4d40b.firebaseapp.com",
  projectId: "twitter-reloaded-4d40b",
  storageBucket: "twitter-reloaded-4d40b.appspot.com",
  messagingSenderId: "774097103949",
  appId: "1:774097103949:web:752b4af2bdfad16f990004",
  measurementId: "G-1S8EYJKJ78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// app에 대한 인증서비스를 이용하겠다라는 의미 
export const auth = getAuth(app);

export const storage = getStorage(app); 

export const db = getFirestore(app)