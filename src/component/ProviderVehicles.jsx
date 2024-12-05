// import { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { useAuth } from "../context/AuthContext";
// import LOPA from "./LOPA";

// const ProviderVehicles = ({ type }) => {
//   const { Vahana } = useAuth();
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const db = getFirestore();
//   const auth = getAuth();

//   const fetchVehicles = async () => {
//     if (!auth.currentUser) return;

//     try {
//       const vehiclesRef = collection(db, "vehicles");
//       const q = query(
//         vehiclesRef,
//         where("providerId", "==", auth.currentUser.uid),
//       );
//       const querySnapshot = await getDocs(q);

//       const vehiclesList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setVehicles(vehiclesList);
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//       alert("Failed to fetch vehicles. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (vehicleId) => {
//     if (!auth.currentUser) return;

//     try {
//       await deleteDoc(doc(db, "vehicles", vehicleId));
//       fetchVehicles(); // Refresh the list after deletion
//       alert("Vehicle deleted successfully");
//     } catch (error) {
//       console.error("Error deleting vehicle:", error);
//       alert("Failed to delete vehicle. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//   }, [type]);

//   const filteredVehicles = type
//     ? vehicles.filter((vehicle) => vehicle.type === type)
//     : vehicles;

//   return (
//     <div>
//       {loading ? (
//         <div className="flex h-80 w-full items-center justify-center rounded bg-[#9bb8e062] shadow-[#9bb8e0]">
//           <LOPA />
//         </div>
//       ) : filteredVehicles.length === 0 ? (
//         <div className="text-center">No vehicles found</div>
//       ) : (
//         <div className="flex flex-col gap-1 overflow-y-scroll p-2">
//           {filteredVehicles.map((vehicle) => (
//             <div
//               key={vehicle.id}
//               className={`grid h-32 grid-cols-[1fr_2fr] items-center px-2 ${
//                 vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
//               } w-full rounded shadow-md`}
//             >
//               <div className="w-32">
//                 <img
//                   src={
//                     Vahana[vehicle.name]?.[0] ||
//                     "https://via.placeholder.com/150"
//                   }
//                   alt={vehicle.name}
//                   className={`h-28 w-28 object-contain ${
//                     vehicle.type === "Bike"
//                       ? "drop-shadow-[0px_0px_50px_#005aeb]"
//                       : "drop-shadow-[0px_0px_50px_red]"
//                   }`}
//                 />
//               </div>
//               <div className="flex flex-col items-center text-[12px]">
//                 <h3 className="text-sm font-semibold">{vehicle.name}</h3>
//                 <p>{vehicle.type}</p>
//                 <p>₹{vehicle.price} per day</p>
//                 <p>{vehicle.location}</p>
//                 <button
//                   onClick={() => handleDelete(vehicle.id)}
//                   className="self mt-2 rounded bg-red-500 px-2 py-1 text-white shadow-lg hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProviderVehicles;

import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import LOPA from "./LOPA";
import HELMET from '../images/Helmet.gif'

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
        where("providerId", "==", auth.currentUser.uid)
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

  const toggleSoldStatus = async (vehicleId, currentStatus) => {
    if (!auth.currentUser) return;

    try {
      const vehicleDoc = doc(db, "vehicles", vehicleId);
      await updateDoc(vehicleDoc, {
        isSold: !currentStatus, // Toggle the status
      });
      fetchVehicles(); // Refresh the list after toggling
      // alert(`Vehicle marked as ${!currentStatus ? "Sold" : "Available"}`);
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      alert("Failed to update vehicle status. Please try again.");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [type]);

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
              className={`grid h-32 grid-cols-[1fr_2fr] items-center px-2 w-full rounded shadow-md ${vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
                } transition-opacity duration-300`}
            >
              <div className="w-32">
                <img
                  src={
                    Vahana[vehicle.name]?.[0] ||
                    "https://via.placeholder.com/150"
                  }
                  alt={vehicle.name}
                  className={`${vehicle.isSold ? "opacity-30" : "opacity-100"
                    } h-28 w-28 object-contain ${vehicle.type === "Bike"
                      ? "drop-shadow-[0px_0px_50px_#005aeb]"
                      : "drop-shadow-[0px_0px_50px_red]"
                    }`}
                />
              </div>
              <div className="flex flex-col items-center text-[12px]">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold">{vehicle.name}</h3>
                  {vehicle.helmetsIncluded ? <img className="h-4" src={HELMET} alt="" /> : <></>}
                </div>
                <p>₹{vehicle.price} per day</p>
                {/* <p>{vehicle.location}</p> */}
                <p className={`text-xs`}>
                  Status: <span className={` ${vehicle.isSold ? "text-red-500 font-semibold" : "text-green-600 font-semibold"
                    }`}>{vehicle.isSold ? "Sold" : "Available"}</span>
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className={`${vehicle.isSold ? "opacity-30" : "opacity-100"
                      } rounded bg-red-500 px-2 py-1 text-white shadow-lg hover:bg-red-600 opacity-100`}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      toggleSoldStatus(vehicle.id, vehicle.isSold)
                    }
                    className={`rounded px-2 py-1 text-white shadow-lg opacity-100 ${vehicle.isSold
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                  >
                    {vehicle.isSold ? "Available" : "Sold"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderVehicles;

{
  /* <div className="flex flex-col gap-1 overflow-y-scroll p-2">
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
        </div> */
}
