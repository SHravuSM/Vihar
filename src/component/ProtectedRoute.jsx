// // PrivateRoute.js
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { auth } from "../firebaseConfig"; // Import auth from your Firebase config

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuthStatus = () => {
//       const user = auth.currentUser;
//       if (user) {
//         // Placeholder for actual Firestore role lookup
//         const userRoleFromFirestore = "vehicle provider"; // This should come from Firestore or Firebase DB

//         setUserRole(userRoleFromFirestore);
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//       setLoading(false);
//     };

//     checkAuthStatus();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Or you can add a loading spinner here
//   }

//   if (!isAuthenticated) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     // If the user does not have the correct role, redirect them
//     return <Navigate to="/" replace />;
//   }

//   // Render children if authenticated and role is allowed
//   return children;
// };

// export default PrivateRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ProtectedRoute component for Admin or Provider routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth(); // Get the current user and their role from context

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/join-us" />;
  }

  // If the user does not have an allowed role, redirect to a "No Access" page
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children; // Render children (protected component) if authenticated and authorized
};

export default ProtectedRoute;
