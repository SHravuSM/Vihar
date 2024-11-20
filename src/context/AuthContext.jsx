// // AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
//   deleteUser,
// } from "firebase/auth";
// import { setDoc, doc, getDoc } from "firebase/firestore";
// import Splendor_Plus from "../images/Bikes/Splendor Plus.png";
// import Activa_6G from "../images/Scooters/Activa 6G.png";
// import Fascino from "../images/Scooters/Fascino.png";
// import Passion_Pro from "../images/Bikes/Passion Pro.png";
// import Shine from "../images/Bikes/Shine.png";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [inOff, setInOff] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const googleProvider = new GoogleAuthProvider();

//   const Vahana = {
//     "Shine": [Shine, Fascino, Passion_Pro],
//     "Fascino": [Fascino, Shine, Passion_Pro],
//     "Passion Pro": [Passion_Pro, Fascino, Shine],
//     "Activa 6G": [Activa_6G, Passion_Pro, Fascino, Shine],
//     "Splendor Plus": [Splendor_Plus],
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       // console.log(user);

//       setLoading(true);
//       if (user) {
//         setUser(user);
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           console.log(docSnap.data().role);
//           // setRole(docSnap.data().role);
//           // console.log(role);
//         } else {
//           setRole(null);
//         }
//         console.log(role);

//       } else {
//         setUser(null);
//         setRole(null);
//       }
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const handleRegister = async (number) => {
//     if (number.length !== 10) {
//       alert("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const { uid, displayName, email, photoURL } = user;
//       const userRef = doc(db, "users", uid);
//       const docSnap = await getDoc(userRef);

//       if (!docSnap.exists()) {
//         await setDoc(userRef, {
//           mobile: number,
//           role: "vehicle provider",
//           name: displayName || "N/A",
//           email: email || "N/A",
//           photoURL: photoURL || null,
//           createdAt: new Date().toISOString(),
//           // Payment-related fields (initially blank)
//           paymentStatus: null,       // Tracks the overall payment status (can be 'pending', 'completed', etc.)
//           isPaid: false,             // Indicates if the provider has made the payment
//           paymentDate: null,         // The date when payment is made (null initially)
//           paymentDetails: null,      // Additional details for payment (null initially)
//         });

//         navigate("/provider");
//       }
//       else {
//         alert("You are already registered. Please log in.");
//       }
//     } catch (error) {
//       await deleteUser(user);
//       console.error("Error during registration:", error);
//       alert(`Something went wrong: ${error.message}`);
//     }
//   };

//   const value = {
//     user,
//     auth,
//     googleProvider,
//     role,
//     loading,
//     Vahana,
//     inOff,
//     setInOff,
//     handleRegister,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  deleteUser,
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
    Shine: [Shine, Fascino, Passion_Pro],
    Fascino: [Fascino, Shine, Passion_Pro],
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
    setInOff,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
