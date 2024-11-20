// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { Link } from "react-router-dom";

// const ManageVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const db = getFirestore();

//   // Fetch all vehicles
//   useEffect(() => {
//     const fetchVehicles = async () => {
//       const vehiclesRef = collection(db, "vehicles");
//       const vehicleSnapshot = await getDocs(vehiclesRef);
//       const vehicleList = vehicleSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setVehicles(vehicleList);
//     };

//     fetchVehicles();
//   }, [db]);

//   // Delete a vehicle
//   const handleDelete = async (id) => {
//     const vehicleRef = doc(db, "vehicles", id);
//     await deleteDoc(vehicleRef);
//     setVehicles(vehicles.filter((vehicle) => vehicle.id !== id)); // Update UI after delete
//   };

//   return (
//     <div className="p-4">
//       <h2 className="mb-6 text-3xl font-bold">Manage Vehicles</h2>
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {vehicles.map((vehicle) => (
//           <div key={vehicle.id} className="rounded bg-white p-4 shadow">
//             <h3 className="font-semibold">{vehicle.name}</h3>
//             <p>{vehicle.type}</p>
//             <p>{vehicle.providerId}</p>
//             <Link
//               to={`/admin/vehicles/edit/${vehicle.id}`}
//               className="text-blue-500 hover:text-blue-700"
//             >
//               Edit
//             </Link>
//             <button
//               onClick={() => handleDelete(vehicle.id)}
//               className="ml-2 text-red-500 hover:text-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageVehicles;

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
  const [loading, setLoading] = useState(true); // Loading state
  const db = getFirestore();

  // Fetch all vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesRef = collection(db, "vehicles");
        const vehicleSnapshot = await getDocs(vehiclesRef);
        const vehicleList = vehicleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(vehicleList);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchVehicles();
  }, [db]);

  // Delete a vehicle
  const handleDelete = async (id) => {
    const vehicleRef = doc(db, "vehicles", id);
    try {
      await deleteDoc(vehicleRef);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id)); // Update UI after delete
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Manage Vehicles</h2>
      {vehicles.length === 0 ? (
        <p className="text-lg text-gray-600">No vehicles available</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {vehicle.name}
              </h3>
              <p className="text-gray-600">{vehicle.type}</p>
              <p className="text-sm text-gray-500">
                Provider: {vehicle.providerId}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  to={`/admin/vehicles/edit/${vehicle.id}`}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageVehicles;
