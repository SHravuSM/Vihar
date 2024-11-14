import { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProviderVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();

  const fetchVehicles = async () => {
    const vehiclesRef = collection(db, "vehicles");
    const q = query(vehiclesRef, where("providerId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);

    const vehiclesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVehicles(vehiclesList);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="border p-4 rounded shadow">
              <img
                src={vehicle.imageUrl || "https://via.placeholder.com/150"}
                alt={vehicle.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-xl">{vehicle.name}</h3>
              <p>{vehicle.type}</p>
              <p>₹{vehicle.price} per day</p>
              <p>{vehicle.location}</p>
              <button
                onClick={() => handleDelete(vehicle.id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderVehicles;




{/* {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
            <p className="text-gray-700">Type: {vehicle.type}</p>
            <p className="text-gray-700">Location: {vehicle.location}</p>
            <p className="text-gray-700">Price per Day: ${vehicle.price}</p>
            {vehicle.imageUrl && <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-40 object-cover rounded mt-2" />}
            <button
              onClick={() => deleteVehicle(vehicle.id)}
              className="mt-4 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
            >
              Delete Vehicle
            </button>
          </div>
        ))} */}