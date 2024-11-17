import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import LOPA from './LOPA';

const ProviderVehicles = ({ type }) => {
  const { Vahana } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();

  const fetchVehicles = async () => {
    if (!auth.currentUser) return;

    try {
      const vehiclesRef = collection(db, "vehicles");
      const q = query(
        vehiclesRef,
        where("providerId", "==", auth.currentUser.uid),
      );
      const querySnapshot = await getDocs(q);

      const vehiclesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehicles(vehiclesList);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      alert("Failed to fetch vehicles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    if (!auth.currentUser) return;

    try {
      await deleteDoc(doc(db, "vehicles", vehicleId));
      fetchVehicles(); // Refresh the list after deletion
      alert("Vehicle deleted successfully");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle. Please try again.");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = type
    ? vehicles.filter((vehicle) => vehicle.type === type)
    : vehicles;

  return (
    <div>
      {loading ? (
        <div className="flex h-80 w-full items-center justify-center rounded bg-[#9bb8e062] shadow-[#9bb8e0]">
          <LOPA />
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="text-center">No vehicles found</div>
      ) : (
        <div className="flex flex-col gap-1 overflow-y-scroll p-2">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`grid h-32 grid-cols-[1fr_2fr] items-center px-2 ${
                vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
              } w-full rounded shadow-md`}
            >
              <div className="w-32">
                <img
                  src={
                    Vahana[vehicle.name] || "https://via.placeholder.com/150"
                  }
                  alt={vehicle.name}
                  className={`h-28 w-28 object-contain ${
                    vehicle.type === "Bike"
                      ? "drop-shadow-[0px_0px_50px_#005aeb]"
                      : "drop-shadow-[0px_0px_50px_red]"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center text-[12px]">
                <h3 className="text-sm font-semibold">{vehicle.name}</h3>
                <p>{vehicle.type}</p>
                <p>₹{vehicle.price} per day</p>
                <p>{vehicle.location}</p>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="self mt-2 rounded bg-red-500 px-2 py-1 text-white shadow-lg hover:bg-red-600"
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
