import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const ProviderVehiclesViewer = ({ providerId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviderVehicles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Query vehicles by provider ID
        const vehiclesQuery = query(
          collection(db, "vehicles"),
          where("providerId", "==", providerId) // Assuming "providerId" is the field in your Firestore documents
        );

        const querySnapshot = await getDocs(vehiclesQuery);
        const vehiclesList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        setVehicles(vehiclesList);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      fetchProviderVehicles();
    }
  }, [providerId]);

  if (loading) {
    return <div>Loading vehicles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (vehicles.length === 0) {
    return <div>No vehicles found for this provider.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Vehicles by this Provider</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="rounded-lg border border-gray-300 shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <img
              src={vehicle.imageUrl || "https://via.placeholder.com/150"}
              alt={vehicle.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-medium">{vehicle.name}</h3>
            <p className="text-sm text-gray-600">Type: {vehicle.type}</p>
            <p className="text-sm text-gray-600">Location: {vehicle.location}</p>
            <p className="text-sm text-gray-600">Price: ${vehicle.price}/day</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderVehiclesViewer;