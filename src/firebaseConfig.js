// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxQLlgdNmldNS2UdhSgufg9jNy0_8yvao",
  authDomain: "testingapp-e26ee.firebaseapp.com",
  projectId: "testingapp-e26ee",
  storageBucket: "testingapp-e26ee.firebasestorage.app",
  messagingSenderId: "639801135629",
  appId: "1:639801135629:web:d274a7443761f71ccf3b44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
