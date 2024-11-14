import { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProviderVehicles = ({ type }) => {
  const [vehicles, setVehicles] = useState([]);

  const db = getFirestore();
  const auth = getAuth();

  const fetchVehicles = async () => {
    if (!auth.currentUser) return;

    const vehiclesRef = collection(db, "vehicles");
    const q = query(vehiclesRef, where("type", "==", type));
    const querySnapshot = await getDocs(q);

    const vehiclesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVehicles(vehiclesList);
  };

  const handleDelete = async (vehicleId) => {
    console.log(vehicleId);
    console.log(auth.currentUser);
    if (!auth.currentUser) return;

    try {
      await deleteDoc(doc(db, "vehicles", vehicleId));
      fetchVehicles();
      alert("Vehicle deleted successfully");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle. Please try again.");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [type]);

  return (
    <div className="border-red-500 rounded">
      {vehicles.length === 0 ? (
        <div>No vehicles found</div>
      ) : (
        <div className="w-full flex gap-1 flex-col overflow-y-scroll">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex border-2 h-32 justify-evenly items-center w-full rounded-md">
              <div className="rounded shadow">
                <img
                  src={vehicle.imageUrl || "https://via.placeholder.com/150"}
                  alt={vehicle.name}
                  className="h-24 rounded shadow-md object-cover"
                />
              </div>
              <div className="w-[50%] text-[12px] flex flex-col items-center ">
                <h3 className="text-sm font-semibold">{vehicle.name}</h3>
                <p>{vehicle.type}</p>
                <p>₹{vehicle.price} per day</p>
                <p>{vehicle.location}</p>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="mt-2 self shadow-lg bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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

export default ProviderVehicles;
