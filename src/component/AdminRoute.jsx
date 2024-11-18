import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Firebase configuration

export default function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        if (userData?.role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/"); // Redirect to home if not admin
        }
      }
    };

    checkAdminRole();
  }, [navigate]);

  return isAdmin ? children : null; // Only render children if the user is an admin
}
