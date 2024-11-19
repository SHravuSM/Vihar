// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig"; // Import Firestore from your Firebase config
// import { signOut } from "firebase/auth";

// const AdminDashboard = () => {
//   const [totalVehicles, setTotalVehicles] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const handleLogout = async () => {
//     setTimeout(() => {
//       try {
//         signOut(auth).then(() => (window.location.href = "/")); // Redirects to login page
//       } catch (error) {
//         console.error("Logout Error:", error);
//       }
//     }, 200);
//   }; // Get handleLogout from context

//   // Fetch vehicle and user counts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const vehiclesRef = collection(db, "vehicles");
//         const usersRef = collection(db, "users");

//         const vehicleSnapshot = await getDocs(vehiclesRef);
//         const userSnapshot = await getDocs(usersRef);

//         setTotalVehicles(vehicleSnapshot.size);
//         setTotalUsers(userSnapshot.size);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="mb-6 text-3xl font-bold">Admin Dashboard</h2>
      
//       {/* Dashboard Stats */}
//       <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <div className="rounded bg-blue-500 p-4 text-white shadow">
//           <h3 className="text-xl font-semibold">Total Vehicles</h3>
//           <p className="text-2xl">{totalVehicles}</p>
//         </div>
//         <div className="rounded bg-green-500 p-4 text-white shadow">
//           <h3 className="text-xl font-semibold">Total Users</h3>
//           <p className="text-2xl">{totalUsers}</p>
//         </div>
//         <div className="rounded bg-purple-500 p-4 text-white shadow">
//           <h3 className="text-xl font-semibold">Manage</h3>
//           <div>
//             <Link
//               to="manage-vehicles"
//               className="text-lg text-white hover:text-gray-300"
//             >
//               Manage Vehicles
//             </Link>
//             <br />
//             <Link
//               to="manage-users"
//               className="text-lg text-white hover:text-gray-300"
//             >
//               Manage Users
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-700"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default AdminDashboard;





import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const AdminDashboard = () => {
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  const handleLogout = async () => {
    setTimeout(() => {
      try {
        signOut(auth).then(() => (window.location.href = "/"));
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }, 200);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const vehiclesRef = collection(db, "vehicles");
        const usersRef = collection(db, "users");

        const vehicleSnapshot = await getDocs(vehiclesRef);
        const userSnapshot = await getDocs(usersRef);

        setTotalVehicles(vehicleSnapshot.size);
        setTotalUsers(userSnapshot.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return <div className="flex justify-center items-center"><Spinner animation="border" /></div>; // Loading spinner
  // }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-md">
          <h3 className="text-lg font-semibold">Total Vehicles</h3>
          <p className="mt-2 text-3xl font-bold">{totalVehicles}</p>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="mt-2 text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-md">
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