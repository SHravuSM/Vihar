import { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProviderVehicles = ({type}) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehitype, setVehiType] = useState(null)
  
  useEffect(()=>{
    
    const vehi = vehicles.filter(each=>{
      return each.type == type;
    })

    setVehiType(vehi);
  },[type])
  console.log(vehitype);
  

  const db = getFirestore();
  const auth = getAuth();

  const fetchVehicles = async () => {
    if (!auth.currentUser) return;

    try {
      const vehiclesRef = collection(db, "vehicles");
      // Filter vehicles by the current provider's uid
      const q = query(vehiclesRef, where("providerId", "==", auth.currentUser.uid));
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
      fetchVehicles();
      alert("Vehicle deleted successfully");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle. Please try again.");
    }
  };

console.log(vehicles);
console.log(type);

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-red-500 rounded">
      {vehicles.length === 0 ? (
        <div>No vehicles found</div>
      ) : (
        <div className="w-full flex gap-1 flex-col overflow-y-scroll">
          {vehitype.map((vehicle) => (
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
