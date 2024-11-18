// import React, { useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import ConWithGoo from "./ConWithGoo";

// const LoginComponent = ({ number }) => {
//   const { signInWithGoogle, role } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (role === "admin") {
//       navigate("/admin");
//     } else if (role === "vehicle provider") {
//       navigate("/provider");
//     }
//   }, [role, navigate]);

//   const handleGoogleLogin = async () => {
//     await signInWithGoogle({ number });
//   };

//   return (
//     <div
//       onClick={handleGoogleLogin}
//       className="flex items-center gap-0 rounded shadow-md"
//     >
//       <ConWithGoo />
//     </div>
//   );
// };

// export default LoginComponent;
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Firebase setup
import ConWithGoo from "./ConWithGoo"; // Google login button component

const LoginComponent = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        if (userData.role === "vehicle provider") navigate("/provider");
        else if (userData.role === "admin") navigate("/admin");
        else navigate('/');
      } else {
        await deleteUser(user);
        navigate("/join-us");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={handleGoogleLogin}
        className="flex cursor-pointer items-center gap-0 rounded shadow-md"
      >
        <ConWithGoo />
      </div>
    </div>
  );
};

export default LoginComponent;
