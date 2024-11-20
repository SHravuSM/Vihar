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

// // import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// // import { Spinner } from "react-bootstrap"; // You can use any spinner

// // ProtectedRoute component for Admin or Provider routes
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, role, loading } = useAuth(); // Get user, role, and loading state from context

//   // If loading, show spinner or loading component
//   if (loading) {
//     return <div className="flex justify-center items-center"><Spinner animation="border" /></div>;
//   }

//   // If not authenticated, redirect to login
//   if (!user) {
//     return <Navigate to="/join-us" />;
//   }

//   // If user role is not in allowedRoles, redirect to No Access page
//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/no-access" />; // Create a custom "No Access" page
//   }

//   return children; // Render children (protected route) if authenticated and authorized
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Tailwind spinner component (alternative to react-bootstrap Spinner)
const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
  </div>
);

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth(); // Get user, role, and loading state from context

  // If loading, show spinner or loading component
  if (loading) {
    return <Spinner />;
  }

  // If not authenticated, redirect to join-us (login/signup)
  if (!user) {
    return <Navigate to="/join-us" />;
  }

  // If user role is not in allowedRoles, redirect to No Access page
  if (user && role && !allowedRoles.includes(role)) {
    return <Navigate to="/no-access" />; // Redirect to No Access page if role is not authorized
  }

  return children; // Render children (protected route) if authenticated and authorized
};

export default ProtectedRoute;
