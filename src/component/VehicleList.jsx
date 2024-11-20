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


// import React, { useState, useEffect, useRef } from "react";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import Radio from "./Radio";
// import { useAuth } from "../context/AuthContext";
// import LOPA from "./LOPA";
// import Close from "../images/Close.png";
// import RIGHT from "../images/Right.png";
// import LEFT from "../images/Left.png";
// import { useSwipeable } from "react-swipeable";

// const VehicleList = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const db = getFirestore();
//   const [type, setType] = useState("Bike");
//   const { Vahana } = useAuth();

//   const [showModal, setShowModal] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const modalRef = useRef(null);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       const vehiclesRef = collection(db, "vehicles");
//       const querySnapshot = await getDocs(vehiclesRef);
//       const vehiclesList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       const filteredVehicles = vehiclesList.filter(
//         (each) => each.type === type
//       );
//       setVehicles(filteredVehicles);
//       setLoading(false);
//     };

//     fetchVehicles();
//   }, [db, type]);

//   const openModal = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setCurrentImageIndex(0);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedVehicle(null);
//   };

//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if (modalRef.current && !modalRef.current.contains(event.target)) {
//   //       closeModal();
//   //     }
//   //   };

//   //   document.addEventListener("mousedown", handleClickOutside);

//   //   return () => {
//   //     document.removeEventListener("mousedown", handleClickOutside);
//   //   };
//   // }, []);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       setLoading(true); // Show loader while fetching
//       const vehiclesRef = collection(db, "vehicles");
//       const querySnapshot = await getDocs(vehiclesRef);
//       const vehiclesList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       // Filter based on both vehicle type and payment status
//       const filteredVehicles = vehiclesList.filter(
//         (vehicle) => vehicle.type === type && vehicle.isPaid === true
//       );

//       setVehicles(filteredVehicles);
//       setLoading(false); // Hide loader after fetching
//     };

//     fetchVehicles();
//   }, [db, type]);


//   const handleSwipeLeft = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === Vahana[selectedVehicle.name].length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleSwipeRight = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? Vahana[selectedVehicle.name].length - 1 : prevIndex - 1
//     );
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleSwipeLeft,
//     onSwipedRight: handleSwipeRight,
//     delta: 10,
//     trackTouch: true,
//     trackMouse: true,
//     preventScrollOnSwipe: true,
//   });

//   const handlePrev = () => {
//     handleSwipeRight();
//   };

//   const handleNext = () => {
//     handleSwipeLeft();
//   };

//   return (
//     <div className="flex flex-col items-center w-full gap-4 p-4">
//       <div className="flex w-full flex-col">
//         <h2 className="text-center text-xl font-bold">
//           Available Vehicles for Rent
//         </h2>
//       </div>
//       <Radio type={type} setType={setType} />

//       {loading ? (
//         <div className="flex h-[80vh] w-full items-center justify-center rounded p-2 shadow-[#9bb8e0]">
//           <LOPA />
//         </div>
//       ) : (
//         <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
//           {vehicles.map((vehicle) => (
//             <div
//               key={vehicle.id}
//               className={`flex flex-col items-start p-3 gap-2 border rounded-md shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ${vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
//                 }`}
//               onClick={() => openModal(vehicle)}
//             >
//               <img
//                 src={
//                   Vahana[vehicle.name]?.[0] || "https://via.placeholder.com/150"
//                 }
//                 alt={vehicle.name}
//                 className="w-full h-32 object-contain"
//               />
//               <h3 className="text-lg font-medium">{vehicle.name}</h3>
//               <p className="text-sm">₹{vehicle.price}/day</p>
//               <p className="text-xs text-gray-600">{vehicle.location}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && selectedVehicle && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//           <div
//             ref={modalRef}
//             className="relative w-full max-w-md rounded-lg bg-white shadow-lg p-6 space-y-4 md:max-w-lg"
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
//             >
//               <img className="h-5" src={Close} alt="Close" />
//             </button>

//             <h2 className="text-2xl font-semibold text-center">
//               {selectedVehicle.name}
//             </h2>

//             <div
//               {...swipeHandlers}
//               className="relative flex items-center justify-center gap-2 overflow-hidden"
//             >
//               <button
//                 onClick={handlePrev}
//                 className="p-2 text-gray-500 hover:text-gray-700"
//               >
//                 <img className="h-6" src={LEFT} alt="Previous" />
//               </button>
//               <img
//                 src={
//                   Vahana[selectedVehicle.name]?.[currentImageIndex] ||
//                   "https://via.placeholder.com/150"
//                 }
//                 alt={selectedVehicle.name}
//                 className="w-48 h-48 object-contain"
//               />
//               <button
//                 onClick={handleNext}
//                 className="p-2 text-gray-500 hover:text-gray-700"
//               >
//                 <img className="h-6" src={RIGHT} alt="Next" />
//               </button>
//             </div>

//             <div className="space-y-2">
//               <p className="text-gray-800">{selectedVehicle.description}</p>
//               <p className="text-lg font-semibold">
//                 ₹{selectedVehicle.price}/day
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleList;



import React, { useState, useEffect, useRef } from "react";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";
import Radio from "./Radio";
import { useAuth } from "../context/AuthContext";
import LOPA from "./LOPA";
import Close from "../images/Close.png";
import RIGHT from "../images/Right.png";
import LEFT from "../images/Left.png";
import { useSwipeable } from "react-swipeable";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const [type, setType] = useState("Bike");
  const { Vahana } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true); // Show loader while fetching

      const vehiclesRef = collection(db, "vehicles");
      const querySnapshot = await getDocs(vehiclesRef);
      const vehiclesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch user data for each vehicle provider to check payment status
      const filteredVehicles = [];

      for (const vehicle of vehiclesList) {
        const providerRef = doc(db, "users", vehicle.providerId); // Assuming `providerId` is stored in vehicle data
        const providerDoc = await getDoc(providerRef);

        if (providerDoc.exists()) {
          const providerData = providerDoc.data();

          // Check if the provider has made the payment and if the payment is within the last 24 hours
          if (providerData.isPaid && isPaymentWithin24Hours(providerData.paymentDate)) {
            filteredVehicles.push(vehicle); // Add the vehicle if payment is valid
          }
        }
      }

      setVehicles(filteredVehicles);
      setLoading(false); // Hide loader after fetching
    };

    fetchVehicles();
  }, [db, type]);

  // Helper function to check if payment is within the last 24 hours
  const isPaymentWithin24Hours = (paymentDate) => {
    if (!paymentDate) return false;
    const paymentTimestamp = paymentDate.seconds * 1000; // Convert Firestore timestamp to JavaScript timestamp
    const currentTime = Date.now();
    return currentTime - paymentTimestamp <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  };

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  const handleSwipeLeft = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === Vahana[selectedVehicle.name].length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? Vahana[selectedVehicle.name].length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    delta: 10,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const handlePrev = () => {
    handleSwipeRight();
  };

  const handleNext = () => {
    handleSwipeLeft();
  };

  return (
    <div className="flex flex-col items-center w-full gap-4 p-4">
      <div className="flex w-full flex-col">
        <h2 className="text-center text-xl font-bold">
          Available Vehicles for Rent
        </h2>
      </div>
      <Radio type={type} setType={setType} />

      {loading ? (
        <div className="flex h-[80vh] w-full items-center justify-center rounded p-2 shadow-[#9bb8e0]">
          <LOPA />
        </div>
      ) : (
        <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`flex flex-col items-start p-3 gap-2 border rounded-md shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ${vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
                }`}
              onClick={() => openModal(vehicle)}
            >
              <img
                src={Vahana[vehicle.name]?.[0] || "https://via.placeholder.com/150"}
                alt={vehicle.name}
                className="w-full h-32 object-contain"
              />
              <h3 className="text-lg font-medium">{vehicle.name}</h3>
              <p className="text-sm">₹{vehicle.price}/day</p>
              <p className="text-xs text-gray-600">{vehicle.location}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-md rounded-lg bg-white shadow-lg p-6 space-y-4 md:max-w-lg"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
            >
              <img className="h-5" src={Close} alt="Close" />
            </button>

            <h2 className="text-2xl font-semibold text-center">
              {selectedVehicle.name}
            </h2>

            <div
              {...swipeHandlers}
              className="relative flex items-center justify-center gap-2 overflow-hidden"
            >
              <button
                onClick={handlePrev}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <img className="h-6" src={LEFT} alt="Previous" />
              </button>
              <img
                src={Vahana[selectedVehicle.name]?.[currentImageIndex] || "https://via.placeholder.com/150"}
                alt={selectedVehicle.name}
                className="w-48 h-48 object-contain"
              />
              <button
                onClick={handleNext}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <img className="h-6" src={RIGHT} alt="Next" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-gray-800">{selectedVehicle.description}</p>
              <p className="text-lg font-semibold">
                ₹{selectedVehicle.price}/day
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
