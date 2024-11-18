import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the vehicle ID from the URL
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const VehicleDetail = () => {
  const [vehicle, setVehicle] = useState(null);
  const { id } = useParams(); // Get the vehicle ID from the URL
  const db = getFirestore();
  const { Vahana } = useAuth(); // Assuming you're using Vahana for image handling

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const vehicleDoc = doc(db, "vehicles", id);
      const docSnap = await getDoc(vehicleDoc);

      if (docSnap.exists()) {
        setVehicle(docSnap.data());
      } else {
        console.log("No such vehicle!");
      }
    };

    fetchVehicleDetails();
  }, [id, db]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{vehicle.name}</h2>
      <img
        src={Vahana[vehicle.name] || "https://via.placeholder.com/300"}
        alt={vehicle.name}
        className="w-full h-64 object-cover mt-4"
      />
      <p className="mt-2 text-lg">Price: ₹{vehicle.price}/day</p>
      <p className="mt-1">{vehicle.description}</p>
      <p className="mt-2">Location: {vehicle.location}</p>
      <p className="mt-2">Contact: {vehicle.providerContact}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default VehicleDetail;
