
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);