import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ManageVehicles from "./ManageVehicles";
import ManageUsers from "./ManageUsers";

const AdminDashboard = () => {
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const db = getFirestore();

  // Fetch vehicle and user counts
  useEffect(() => {
    const fetchData = async () => {
      const vehiclesRef = collection(db, "vehicles");
      const usersRef = collection(db, "users");

      const vehicleSnapshot = await getDocs(vehiclesRef);
      const userSnapshot = await getDocs(usersRef);

      setTotalVehicles(vehicleSnapshot.size);
      setTotalUsers(userSnapshot.size);
    };

    fetchData();
  }, [db]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Total Vehicles</h3>
          <p className="text-2xl">{totalVehicles}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Manage</h3>
          <div>
            <Link
              to="/admin/manage-vehicles"
              className="text-lg text-white hover:text-gray-300"
            >
              Manage Vehicles
            </Link>
            <br />
            <Link
              to="/admin/manage-users"
              className="text-lg text-white hover:text-gray-300"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </div>

      {/* Routing for managing vehicles and users */}
      <Routes>
        <Route path="/manage-vehicles" element={<ManageVehicles />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;