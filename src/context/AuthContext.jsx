// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import Splendor_Plus from '../images/Bikes/Splendor Plus.png';
import Activa_6G from '../images/Scooters/Activa 6G.png';
import Fascino from '../images/Scooters/Fascino.png';
import Passion_Pro from '../images/Bikes/Passion Pro.png';
import Shine from '../images/Bikes/Shine.png';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const Vahana = {
    "Shine": Shine,
    "Fascino": Fascino,
    "Passion Pro": Passion_Pro,
    "Activa 6G" : Activa_6G,
    "Splendor Plus": Splendor_Plus,
  }

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);

        // Fetch the user's role from Firestore
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role); // Set role if user exists in Firestore
        } else {
          setRole(null); // No role found
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Google sign-in function
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Assign "vehicle provider" role if user doesn't already exist
        await setDoc(docRef, { role: 'vehicle provider' });
        setRole('vehicle provider');
      } else {
        setRole(docSnap.data().role); // Set role if user exists in Firestore
      }
    } catch (error) {
      //console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    role,
    loading,
    Vahana,
    // Delete,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
