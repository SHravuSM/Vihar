// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig";
// import { signOut } from "firebase/auth";

// const AdminDashboard = () => {
//   const [totalVehicles, setTotalVehicles] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [loading, setLoading] = useState(true); // Loading state

//   const handleLogout = async () => {
//     setTimeout(() => {
//       try {
//         signOut(auth).then(() => (window.location.href = "/"));
//       } catch (error) {
//         console.error("Logout Error:", error);
//       }
//     }, 200);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true); // Start loading
//         const vehiclesRef = collection(db, "vehicles");
//         const usersRef = collection(db, "users");

//         const vehicleSnapshot = await getDocs(vehiclesRef);
//         const userSnapshot = await getDocs(usersRef);

//         setTotalVehicles(vehicleSnapshot.size);
//         setTotalUsers(userSnapshot.size);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchData();
//   }, []);

//   // if (loading) {
//   //   return <div className="flex justify-center items-center"><Spinner animation="border" /></div>; // Loading spinner
//   // }

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Dashboard Stats */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-md">
//           <h3 className="text-lg font-semibold">Total Vehicles</h3>
//           <p className="mt-2 text-3xl font-bold">{totalVehicles}</p>
//         </div>
//         <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-md">
//           <h3 className="text-lg font-semibold">Total Users</h3>
//           <p className="mt-2 text-3xl font-bold">{totalUsers}</p>
//         </div>
//         <div className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-md">
//           <h3 className="text-lg font-semibold">Manage</h3>
//           <div className="mt-4 space-y-2">
//             <Link
//               to="manage-vehicles"
//               className="block text-base font-medium hover:underline"
//             >
//               Manage Vehicles
//             </Link>
//             <Link
//               to="manage-users"
//               className="block text-base font-medium hover:underline"
//             >
//               Manage Users
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const AdminDashboard = () => {
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0); // Track active users
  const [activeProviders, setActiveProviders] = useState(0); // Track active providers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/"; // Redirect to login
    } catch (error) {
      console.error("Logout Error:", error);
      setError("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const vehiclesRef = collection(db, "vehicles");
        const usersRef = collection(db, "users");

        // Fetch vehicles and users
        const vehicleSnapshot = await getDocs(vehiclesRef);
        const userSnapshot = await getDocs(usersRef);

        setTotalVehicles(vehicleSnapshot.size);
        setTotalUsers(userSnapshot.size);

        // Count active users and vehicle providers
        const activeUserQuery = query(usersRef, where("isActive", "==", true)); // Assuming `isActive` is a field in the user data
        const activeProviderQuery = query(
          usersRef,
          where("role", "==", "vehicle provider"),
        );

        const activeUserSnapshot = await getDocs(activeUserQuery);
        const activeProviderSnapshot = await getDocs(activeProviderQuery);

        setActiveUsers(activeUserSnapshot.size);
        setActiveProviders(activeProviderSnapshot.size);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="spinner-border h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-md">
          <h3 className="text-lg font-semibold">Total Vehicles</h3>
          <p className="mt-2 text-3xl font-bold">
            {totalVehicles > 0 ? totalVehicles : "No vehicles available"}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="mt-2 text-3xl font-bold">
            {totalUsers > 0 ? totalUsers : "No users available"}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white shadow-md">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="mt-2 text-3xl font-bold">
            {activeUsers > 0 ? activeUsers : "No active users"}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-md">
          <h3 className="text-lg font-semibold">Active Providers</h3>
          <p className="mt-2 text-3xl font-bold">
            {activeProviders > 0 ? activeProviders : "No active providers"}
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white shadow-md">
          <h3 className="text-lg font-semibold">Manage</h3>
          <div className="mt-4 space-y-2">
            <Link
              to="manage-vehicles"
              className="block text-base font-medium hover:underline"
            >
              Manage Vehicles
            </Link>
            <Link
              to="manage-users"
              className="block text-base font-medium hover:underline"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;