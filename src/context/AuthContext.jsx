import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Splendor_Plus1 from "../images/Bikes/Splendor Plus1.png";
import Splendor_Plus2 from "../images/Bikes/Splendor Plus2.png";
import Splendor_Plus3 from "../images/Bikes/Splendor Plus3.png";
import Activa_6G1 from "../images/Scooters/Activa 6G1.png";
import Activa_6G2 from "../images/Scooters/Activa 6G2.png";
import Activa_6G3 from "../images/Scooters/Activa 6G3.png";
import Fascino1 from "../images/Scooters/Fascino1.png";
import Fascino2 from "../images/Scooters/Fascino2.png";
import Fascino3 from "../images/Scooters/Fascino3.png";
import Passion_Pro1 from "../images/Bikes/Passion Pro1.png";
import Passion_Pro2 from "../images/Bikes/Passion Pro2.png";
import Passion_Pro3 from "../images/Bikes/Passion Pro3.png";
import Shine1 from "../images/Bikes/Shine1.png";
import Shine2 from "../images/Bikes/Shine2.png";
import Shine3 from "../images/Bikes/Shine3.png";
import { useNavigate } from "react-router-dom";
// import { useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [inOff, setInOff] = useState(true);
  const [comName, setComName] = useState('')
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const Vahana = {
    'Shine': [Shine1, Shine2, Shine3],
    'Fascino': [Fascino1, Fascino2, Fascino3],
    "Passion Pro": [Passion_Pro1, Passion_Pro2, Passion_Pro3],
    "Activa 6G": [Activa_6G1, Activa_6G2, Activa_6G3],
    "Splendor Plus": [Splendor_Plus1, Splendor_Plus2, Splendor_Plus3],
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.role);
        } else {
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleRegister = async (number) => {
    if (number.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const { uid, displayName, email, photoURL } = user;
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          mobile: number,
          company: comName,
          role: "vehicle provider",
          name: displayName || "N/A",
          email: email || "N/A",
          photoURL: photoURL || null,
          createdAt: new Date().toISOString(),
          paymentStatus: null, // Tracks the overall payment status (can be 'pending', 'completed', etc.)
          isPaid: false, // Indicates if the provider has made the payment
          paymentDate: null, // The date when payment is made (null initially)
          paymentDetails: null, // Additional details for payment (null initially)
        });

        navigate("/provider");
      } else {
        alert("You are already registered. Please log in.");
      }
    } catch (error) {
      // Only delete user if they exist
      if (user) {
        await deleteUser(user);
      }
      console.error("Error during registration:", error);
      alert(`Something went wrong: ${error.message}`);
    }
  };

  const value = {
    user,
    auth,
    googleProvider,
    role,
    loading,
    Vahana,
    inOff,
    comName,
    setComName,
    setInOff,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
