// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGa9-VXOotA47mY1EIBCPPan7Npz5-LQ0",
  authDomain: "vihar-enterprise.firebaseapp.com",
  projectId: "vihar-enterprise",
  storageBucket: "vihar-enterprise.firebasestorage.app",
  messagingSenderId: "1020787252700",
  appId: "1:1020787252700:web:cfd5fae674d9a2004ac319",
  measurementId: "G-2LKV4DXHS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);
export { auth, db };
