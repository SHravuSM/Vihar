// import { useState, useEffect } from "react";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import Radio from "./Radio";
// import { useAuth } from "../context/AuthContext";
// import GetDetails from "./GetDetails";
// import LOPA from "./LOPA";

// const VehicleList = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const db = getFirestore();
//   const [type, setType] = useState("Bike");
//   const { Vahana } = useAuth();

//   // To store user location
//   const [userLocation, setUserLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });

//   // Fetch vehicles based on user location and vehicle type
//   useEffect(() => {
//     // Fetch user location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setUserLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       });
//     }

//     const fetchVehicles = async () => {
//       const vehiclesRef = collection(db, "vehicles");
//       const querySnapshot = await getDocs(vehiclesRef);

//       const vehiclesList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       // Filter vehicles by selected type
//       const vehicles = vehiclesList.filter((each) => each.type === type);

//       // Sort vehicles by proximity to user location
//       if (userLocation.latitude && userLocation.longitude) {
//         vehicles.sort((a, b) => {
//           const distanceA = calculateDistance(
//             userLocation.latitude,
//             userLocation.longitude,
//             a.latitude,
//             a.longitude,
//           );
//           const distanceB = calculateDistance(
//             userLocation.latitude,
//             userLocation.longitude,
//             b.latitude,
//             b.longitude,
//           );
//           return distanceA - distanceB;
//         });
//       }

//       setVehicles(vehicles);
//       setLoading(false);
//     };

//     fetchVehicles();
//   }, [db, type, userLocation]);

//   // Function to calculate distance between two latitudes and longitudes
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
//   };

//   return (
//     <div className="flex h-screen w-full flex-col items-center pt-4 p-1 gap-3">
//       {/* <Nav/> */}
//       <div className="flex w-full flex-col">
//         <h2 className="text-center text-xl font-bold">
//           Available Vehicles for Rent
//         </h2>
//       </div>
//       <Radio type={type} setType={setType} />

//       {loading ? (
//         <div className="flex h-[80vh] p-2 w-full items-center justify-center rounded shadow-[#9bb8e0]">
//           <LOPA />
//         </div>
//       ) : (
//         // <div className="grid h-full w-full grid-cols-2 gap-1 rounded-md">
//         //   {vehicles.map((vehicle) => (
//         //     <div
//         //       key={vehicle.id}
//         //       className="flex h-full w-full flex-col items-center rounded-md border-2"
//         //     >
//         //       <div className="flex h-[60%] w-full items-center justify-center">
//         //         <img
//         //           src={
//         //             Vahana[vehicle.name] || "https://via.placeholder.com/150"
//         //           }
//         //           alt={vehicle.name}
//         //           className="h-[90%] rounded object-cover"
//         //         />
//         //       </div>
//         //       <div
//         //         className={`h-[40%] w-full p-1 ${vehicle.type === "Bike" && "bg-[#92adde]"} ${vehicle.type === "Scooter" && "bg-red-200"} rounded-[0_0_5px_5px]`}
//         //       >
//         //         <h3 className="text-sm font-semibold">{vehicle.name}</h3>
//         //         <p className="text-sm">₹{vehicle.price}/day</p>
//         //         <p>{vehicle.location}</p>
//         //         <GetDetails type={vehicle.type} />
//         //       </div>
//         //     </div>
//         //   ))}
//         // </div>

//         <div className="flex h-full gap-3 w-full flex-col p-2">
//           {vehicles.map((vehicle) => (
//             <div
//               key={vehicle.id}
//               className={`grid h-32 grid-cols-[1fr_2fr] items-center px-1  ${vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
//                 } w-full rounded shadow-md`}
//             >
//               <div className="w-28">
//                 <img
//                   src={
//                     Vahana[vehicle.name] || "https://via.placeholder.com/150"
//                   }
//                   alt={vehicle.name}
//                   className={`h-24 object-contain ${vehicle.type === "Bike"
//                     ? "drop-shadow-[0px_0px_50px_#005aeb]"
//                     : "drop-shadow-[0px_0px_50px_red]"
//                     }`}
//                 />
//               </div>
//               <div
//                 className='flex flex-col items-start p-1 relative text-[12px]  h-full'
//               >
//                 <h3 className="text-lg font-light">{vehicle.name}</h3>
//                 <p className="text-sm">₹{vehicle.price}/day</p>
//                 <p>{vehicle.location}</p>
//                 <GetDetails type={vehicle.type} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleList;


import React, { useState, useEffect, useRef } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Radio from "./Radio";
import { useAuth } from "../context/AuthContext";
import LOPA from "./LOPA";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const [type, setType] = useState("Bike");
  const { Vahana } = useAuth();

  // Modal state and ref
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const modalRef = useRef(null);

  // Fetch vehicles based on type
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesRef = collection(db, "vehicles");
      const querySnapshot = await getDocs(vehiclesRef);

      const vehiclesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredVehicles = vehiclesList.filter((each) => each.type === type);
      setVehicles(filteredVehicles);
      setLoading(false);
    };

    fetchVehicles();
  }, [db, type]);

  // Open modal with vehicle details
  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center pt-4 p-1 gap-3">
      <div className="flex w-full flex-col">
        <h2 className="text-center text-xl font-bold">
          Available Vehicles for Rent
        </h2>
      </div>
      <Radio type={type} setType={setType} />

      {loading ? (
        <div className="flex h-[80vh] p-2 w-full items-center justify-center rounded shadow-[#9bb8e0]">
          <LOPA />
        </div>
      ) : (
        <div className="flex h-full gap-3 w-full flex-col p-2">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`grid h-32 grid-cols-[1fr_2fr] items-center px-1  ${vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
                } w-full rounded shadow-md`}
              onClick={() => openModal(vehicle)} // Open modal on click
            >
              <div className="w-28">
                <img
                  src={Vahana[vehicle.name] || "https://via.placeholder.com/150"}
                  alt={vehicle.name}
                  className={`h-24 object-contain ${vehicle.type === "Bike"
                    ? "drop-shadow-[0px_0px_50px_#005aeb]"
                    : "drop-shadow-[0px_0px_50px_red]"}`}
                />
              </div>
              <div className="flex flex-col items-start p-1 relative text-[12px] h-full">
                <h3 className="text-lg font-light">{vehicle.name}</h3>
                <p className="text-sm">₹{vehicle.price}/day</p>
                <p>{vehicle.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedVehicle && (
        <div className="fixed inset-0 p-5 w-full flex items-center justify-center bg-gray-400 bg-opacity-50 transition-all duration-300">
          <div
            ref={modalRef} // Attach ref to the modal content
            className="p-5 pt-5 h-3/5 rounded-xl w-full md:w-1/2 lg:w-1/3 bg-white transform transition-all duration-500 ease-in-out shadow-2xl overflow-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-3xl text-gray-600 hover:text-black"
            >
              &times;
            </button>

            <h2 className="text-3xl text-center font-normal">{selectedVehicle.name}</h2>
            <img
              src={Vahana[selectedVehicle.name] || "https://via.placeholder.com/150"}
              alt={selectedVehicle.name}
              className="w-48 h-48 object-contain mx-auto my-5" // Adjusted image size
            />
            <div className="space-y-4">
              <p className="text-xl">{selectedVehicle.description}</p>
              <p className="text-lg font-semibold">₹{selectedVehicle.price}/day</p>
              <p className="text-sm">{selectedVehicle.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
