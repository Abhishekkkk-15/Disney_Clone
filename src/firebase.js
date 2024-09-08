// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATyfscaY629yJehM1JOdrcOKBgShuHdCk",
  authDomain: "disneyplus-clone-bc05f.firebaseapp.com",
  projectId: "disneyplus-clone-bc05f",
  storageBucket: "disneyplus-clone-bc05f.appspot.com",
  messagingSenderId: "970002750033",
  appId: "1:970002750033:web:f6e80aab97be3a813cb670",
  measurementId: "G-QG2R4N3ZQ9"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
