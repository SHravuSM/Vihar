// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Splendor_Plus from "../images/Bikes/Splendor Plus.png";
import Activa_6G from "../images/Scooters/Activa 6G.png";
import Fascino from "../images/Scooters/Fascino.png";
import Passion_Pro from "../images/Bikes/Passion Pro.png";
import Shine from "../images/Bikes/Shine.png";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [inOff, setInOff] = useState(true);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const Vahana = {
    "Shine": [Shine, Fascino, Passion_Pro],
    "Fascino": [Fascino, Shine, Passion_Pro],
    "Passion Pro": [Passion_Pro, Fascino, Shine],
    "Activa 6G": [Activa_6G, Passion_Pro, Fascino, Shine],
    "Splendor Plus": [Splendor_Plus],
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
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
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { uid, displayName, email, photoURL } = user;
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          mobile: number,
          role: "vehicle provider",
          name: displayName || "N/A",
          email: email || "N/A",
          photoURL: photoURL || null,
          createdAt: new Date().toISOString(),
        });
        navigate("/provider");
      } else {
        alert("You are already registered. Please log in.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
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
    setInOff,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
