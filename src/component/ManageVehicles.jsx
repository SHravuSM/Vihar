import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const db = getFirestore();

  // Fetch all vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesRef = collection(db, "vehicles");
      const vehicleSnapshot = await getDocs(vehiclesRef);
      const vehicleList = vehicleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehicles(vehicleList);
    };

    fetchVehicles();
  }, [db]);

  // Delete a vehicle
  const handleDelete = async (id) => {
    const vehicleRef = doc(db, "vehicles", id);
    await deleteDoc(vehicleRef);
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id)); // Update UI after delete
  };

  return (
    <div className="p-4">
      <h2 className="mb-6 text-3xl font-bold">Manage Vehicles</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="rounded bg-white p-4 shadow">
            <h3 className="font-semibold">{vehicle.name}</h3>
            <p>{vehicle.type}</p>
            <p>{vehicle.providerId}</p>
            <Link
              to={`/admin/vehicles/edit/${vehicle.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(vehicle.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageVehicles;
