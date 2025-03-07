// // import { useState } from "react";
// // import { getFirestore, collection, addDoc } from "firebase/firestore";
// // import { getAuth } from "firebase/auth";
// // import { useAuth } from "../context/AuthContext";
// // import Rupee from "../images/Rupee.png";
// // import Adding from "./Adding";

// // const AddVehicle = () => {
// //   const { Vahana } = useAuth();
// //   const [name, setName] = useState("");
// //   const [type, setType] = useState("Bike");
// //   const [price, setPrice] = useState("");
// //   const [description, setDescription] = useState("");
// //   // const [imageUrl, setImageUrl] = useState(""); // Image URL field
// //   const [location, setLocation] = useState("");
// //   const [suggestions, setSuggestions] = useState([]);
// //   // const [loading, setLoading] = useState(false);

// //   const auth = getAuth();
// //   const db = getFirestore();

// //   const handleNameChange = (e) => {
// //     const input = e.target.value;
// //     setName(input);
// //     const matches = Object.keys(Vahana).filter((EV) =>
// //       EV.toLowerCase().includes(input.toLowerCase()),
// //     );
// //     setSuggestions(matches);
// //   };

// //   const handleSuggestionClick = (suggestion) => {
// //     setName(suggestion);
// //     setSuggestions([]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     // setLoading(true);
// //     const user = auth.currentUser;

// //     if (!user) {
// //       alert("User is not authenticated");
// //       return;
// //     }

// //     try {
// //       await addDoc(collection(db, "vehicles"), {
// //         providerId: user.uid,
// //         name,
// //         type,
// //         price,
// //         description,
// //         location,
// //       });
// //       setName("");
// //       setType("Bike");
// //       setPrice("");
// //       setDescription("");
// //       setLocation("");
// //     } catch (error) {
// //       alert("Error adding vehicle. Please try again.");
// //     }
// //     // setLoading(false);
// //   };

// //   return (
// //     <div className="flex h-screen flex-col items-center gap-3 border pl-7 pr-7 pt-4">
// //       <h2 className="text-center text-2xl font-semibold text-black">
// //         Add New Vehicle
// //       </h2>
// //       <img
// //         className="h-36 rounded drop-shadow-[1px_1px_2px_black]"
// //         src={Vahana[name]}
// //         alt=""
// //       />
// //       <div className="space-y-4">
// //         <div className="relative">
// //           <input
// //             type="text"
// //             placeholder="Vehicle Name"
// //             value={name}
// //             onChange={handleNameChange}
// //             required
// //             className="w-full rounded border p-2"
// //           />
// //           {suggestions.length > 0 && (
// //             <ul className="absolute mt-1 w-full rounded border bg-white shadow-md">
// //               {suggestions.map((suggestion) => (
// //                 <li
// //                   key={suggestion}
// //                   onClick={() => handleSuggestionClick(suggestion)}
// //                   className="cursor-pointer p-2 hover:bg-gray-200"
// //                 >
// //                   {suggestion}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>

// //         <div className="flex gap-1">
// //           <div className="flex w-[70%] items-center justify-evenly rounded border bg-white">
// //             <img className="h-6 w-6" src={Rupee} alt="" />
// //             <input
// //               type="number"
// //               placeholder="Price per Day"
// //               value={price}
// //               onChange={(e) => setPrice(e.target.value)}
// //               required
// //               className="w-[84%] border-l-2 border-yellow-400 p-2"
// //             />
// //           </div>

// //           <select
// //             className="w-[30%] rounded"
// //             name="Vehicle type"
// //             value={type}
// //             onChange={(e) => setType(e.target.value)}
// //           >
// //             <option value="Bike">Bike</option>
// //             <option value="Scooter">Scooter</option>
// //           </select>
// //         </div>

// //         <textarea
// //           placeholder="Description"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           required
// //           className="w-full rounded border p-2"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Location"
// //           value={location}
// //           onChange={(e) => setLocation(e.target.value)}
// //           required
// //           className="w-full rounded border p-2"
// //         />
// //         <Adding handleSubmit={handleSubmit} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddVehicle;

// import { useState, useEffect } from "react";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { useAuth } from "../context/AuthContext";
// import Rupee from "../images/Rupee.png";
// import Adding from "./Adding";

// const AddVehicle = () => {
//   const { Vahana } = useAuth();
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [type, setType] = useState("Bike");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [description, setDescription] = useState("");

//   const auth = getAuth();
//   const db = getFirestore();

//   // Fetch location automatically using Geolocation API
//   // useEffect(() => {
//   //   LocationFetching()
//   // }, []);

//   function LocationFetching() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         console.log(position);

//         setLoading(true);
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);

//         // Optionally use reverse geocoding to get location name based on lat/lng
//         fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             setLoading(false);
//             setLocation(
//               data.address.city ||
//                 data.address.city_district ||
//                 "Unknown Location",
//             );
//             console.log(data);
//           })
//           .catch((error) => {
//             setLoading(false);
//             console.error("Error fetching location name:", error);
//           });
//       });
//     }
//   }

//   const handleNameChange = (e) => {
//     const input = e.target.value;
//     setName(input);
//     const matches = Object.keys(Vahana).filter((EV) =>
//       EV.toLowerCase().includes(input.toLowerCase()),
//     );
//     setSuggestions(matches);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setName(suggestion);
//     setSuggestions([]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const user = auth.currentUser;

//     if (!user) {
//       alert("User is not authenticated");
//       setLoading(false);
//       return;
//     }

//     try {
//       await addDoc(collection(db, "vehicles"), {
//         providerId: user.uid,
//         name,
//         type,
//         price,
//         description,
//         location,
//         latitude,
//         longitude,
//       });
//       setName("");
//       setType("Bike");
//       setPrice("");
//       setDescription("");
//       setLocation("");
//       setLatitude(null);
//       setLongitude(null);
//     } catch (error) {
//       alert("Error adding vehicle. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex h-screen flex-col items-center gap-3 border pl-7 pr-7 pt-4">
//       <h2 className="text-center text-2xl font-semibold text-black">
//         Add New Vehicle
//       </h2>
//       <img
//         className="h-36 rounded drop-shadow-[1px_1px_90px_#c53838]"
//         src={Vahana[name]}
//         alt=""
//       />
//       <div className="space-y-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Vehicle Name"
//             value={name}
//             onChange={handleNameChange}
//             required
//             className="w-full rounded border p-2"
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute mt-1 w-full rounded border bg-white shadow-md">
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion}
//                   onClick={() => handleSuggestionClick(suggestion)}
//                   className="cursor-pointer p-2 hover:bg-gray-200"
//                 >
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="flex gap-1">
//           <div className="flex w-[70%] items-center justify-evenly rounded border bg-white">
//             <img className="h-6 w-6" src={Rupee} alt="" />
//             <input
//               type="number"
//               placeholder="Price per Day"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               className="w-[84%] border-l-2 border-yellow-400 p-2"
//             />
//           </div>

//           <select
//             className="w-[30%] rounded"
//             name="Vehicle type"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="Bike">Bike</option>
//             <option value="Scooter">Scooter</option>
//           </select>
//         </div>

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           className="w-full rounded border p-2"
//         />
//         {/* <input
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           required
//           className="w-full rounded border p-2"
//         /> */}
//         <button
//           type="button"
//           onClick={LocationFetching}
//           className="mt-2 w-full rounded bg-green-500 p-2 text-white hover:bg-green-600 disabled:bg-gray-400"
//           disabled={loading} // Disable while fetching
//         >
//           {loading ? "Fetching Location..." : "Use Current Location"}
//         </button>

//         <Adding handleSubmit={handleSubmit} loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default AddVehicle;

// import Adding from "./Adding";
// import Rupee from "../images/Rupee.png";
// import { getAuth } from "firebase/auth";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getFirestore, collection, addDoc } from "firebase/firestore";

// const AddVehicle = () => {
//   const { Vahana } = useAuth();
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [type, setType] = useState("Bike");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);

//   const auth = getAuth();
//   const db = getFirestore();

//   function LocationFetching() {
//     if (!navigator.geolocation) {
//       console.error("Geolocation is not supported by this browser.");
//       return;
//     }

//     // Show a loading state
//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLatitude(latitude);
//         setLongitude(longitude);

//         // Use reverse geocoding to fetch location name
//         fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
//         )
//           .then((response) => {
//             if (!response.ok) {
//               // throw new Error(HTTP error! status: ${ response.status });
//             }
//             return response.json();
//           })
//           .then((data) => {
//             const locationName =
//               data.address.city ||
//               data.address.town ||
//               data.address.village ||
//               data.address.city_district ||
//               "Unknown Location";
//             setLocation(locationName);
//           })
//           .catch((error) => {
//             console.error("Error fetching location name:", error);
//             setLocation("Unable to fetch location");
//           })
//           .finally(() => {
//             setLoading(false);
//           });
//       },
//       (error) => {
//         // Handle geolocation errors
//         setLoading(false);
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             console.error("User denied the request for Geolocation.");
//             setLocation("Permission denied");
//             break;
//           case error.POSITION_UNAVAILABLE:
//             console.error("Location information is unavailable.");
//             setLocation("Location unavailable");
//             break;
//           case error.TIMEOUT:
//             console.error("The request to get user location timed out.");
//             setLocation("Location request timed out");
//             break;
//           default:
//             console.error("An unknown error occurred.");
//             setLocation("Unknown error");
//         }
//       },
//       {
//         enableHighAccuracy: true, // Request high accuracy (uses GPS if available)
//         timeout: 10000,          // Timeout after 10 seconds
//         maximumAge: 0,           // Do not use cached results
//       }
//     );
//   }

//   const handleNameChange = (e) => {
//     const input = e.target.value;
//     setName(input);
//     const matches = Object.keys(Vahana).filter((EV) =>
//       EV.toLowerCase().includes(input.toLowerCase()),
//     );
//     setSuggestions(matches);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setName(suggestion);
//     setSuggestions([]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const user = auth.currentUser;

//     if (!user) {
//       alert("User is not authenticated");
//       setLoading(false);
//       return;
//     }

//     try {
//       await addDoc(collection(db, "vehicles"), {
//         providerId: user.uid,
//         isSold:false,
//         name,
//         type,
//         price,
//         location,
//         latitude,
//         longitude,
//       });
//       setName("");
//       setType("Bike");
//       setPrice("");
//       setLocation("");
//       setLatitude(null);
//       setLongitude(null);
//     } catch (error) {
//       alert("Error adding vehicle. Please try again.");
//     }
//     setLoading(false);
//   };
// console.log(location);


//   return (
//     <div className="flex h-screen flex-col items-center gap-3 border pl-7 pr-7 pt-4">
//       <h2 className="text-center text-2xl font-semibold text-black">
//         Add New Vehicle
//       </h2>
//       <img
//         className="h-36 rounded drop-shadow-[1px_1px_90px_#c53838]"
//         src={Vahana[name]?.[0]}
//         alt=""
//       />
//       <div className="space-y-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Vehicle Name"
//             value={name}
//             onChange={handleNameChange}
//             required
//             className="w-full rounded border p-2"
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute mt-1 w-full rounded border bg-white shadow-md">
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion}
//                   onClick={() => handleSuggestionClick(suggestion)}
//                   className="cursor-pointer p-2 hover:bg-gray-200"
//                 >
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="flex gap-1">
//           <div className="flex w-[70%] items-center justify-evenly rounded border bg-white">
//             <img className="h-6 w-6" src={Rupee} alt="" />
//             <input
//               type="number"
//               placeholder="Price per Day"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               className="w-[84%] border-l-2 border-yellow-400 p-2"
//             />
//           </div>

//           <select
//             className="w-[30%] rounded"
//             name="Vehicle type"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="Bike">Bike</option>
//             <option value="Scooter">Scooter</option>
//           </select>
//         </div>

//         <button
//           type="button"
//           onClick={LocationFetching}
//           className="mt-2 w-full rounded bg-green-500 p-2 text-white hover:bg-green-600 disabled:bg-gray-400"
//           disabled={loading} // Disable while fetching
//         >
//           {loading ? "Fetching Location..." : "Use Current Location"}
//         </button>

//         <Adding handleSubmit={handleSubmit} loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default AddVehicle;



// import Adding from "./Adding";
// import Rupee from "../images/Rupee.png";
// import { getAuth } from "firebase/auth";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getFirestore, collection, addDoc } from "firebase/firestore";

// const AddVehicle = () => {
//   const { Vahana } = useAuth();
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [type, setType] = useState("Bike");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [helmetsIncluded, setHelmetsIncluded] = useState(false);

//   const auth = getAuth();
//   const db = getFirestore();

//   function LocationFetching() {
//     if (!navigator.geolocation) {
//       console.error("Geolocation is not supported by this browser.");
//       return;
//     }

//     // Show a loading state
//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLatitude(latitude);
//         setLongitude(longitude);

//         // Use reverse geocoding to fetch location name
//         fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             const locationName =
//               data.address.city ||
//               data.address.town ||
//               data.address.village ||
//               data.address.city_district ||
//               "Unknown Location";
//             setLocation(locationName);
//           })
//           .catch((error) => {
//             console.error("Error fetching location name:", error);
//             setLocation("Unable to fetch location");
//           })
//           .finally(() => {
//             setLoading(false);
//           });
//       },
//       (error) => {
//         // Handle geolocation errors
//         setLoading(false);
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             console.error("User denied the request for Geolocation.");
//             setLocation("Permission denied");
//             break;
//           case error.POSITION_UNAVAILABLE:
//             console.error("Location information is unavailable.");
//             setLocation("Location unavailable");
//             break;
//           case error.TIMEOUT:
//             console.error("The request to get user location timed out.");
//             setLocation("Location request timed out");
//             break;
//           default:
//             console.error("An unknown error occurred.");
//             setLocation("Unknown error");
//         }
//       },
//       {
//         enableHighAccuracy: true, // Request high accuracy (uses GPS if available)
//         timeout: 10000, // Timeout after 10 seconds
//         maximumAge: 0, // Do not use cached results
//       }
//     );
//   }

//   const handleNameChange = (e) => {
//     const input = e.target.value;
//     setName(input);
//     const matches = Object.keys(Vahana).filter((EV) =>
//       EV.toLowerCase().includes(input.toLowerCase())
//     );
//     setSuggestions(matches);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setName(suggestion);
//     setSuggestions([]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const user = auth.currentUser;

//     if (!user) {
//         alert("User is not authenticated");
//         setLoading(false);
//         return;
//     }

//     // Validation: Check if all required fields are filled and valid
//     if (!name.trim()) {
//         alert("Vehicle name cannot be empty. Please enter a valid name.");
//         setLoading(false);
//         return;
//     }

//     // Ensure the vehicle name matches one of the suggestions
//     if (!Object.keys(Vahana).includes(name)) {
//         alert("Please select a vehicle from the suggestions.");
//         setLoading(false);
//         return;
//     }

//     if (!price || isNaN(price) || Number(price) <= 0) {
//         alert("Please enter a valid price greater than 0.");
//         setLoading(false);
//         return;
//     }

//     if (!type) {
//         alert("Please select a vehicle type.");
//         setLoading(false);
//         return;
//     }

//     if (!location.trim()) {
//         alert("Location cannot be empty. Please use your current location or enter a valid location.");
//         setLoading(false);
//         return;
//     }

//     if (!latitude || !longitude) {
//         alert("Coordinates are missing. Please fetch your current location.");
//         setLoading(false);
//         return;
//     }

//     try {
//         await addDoc(collection(db, "vehicles"), {
//             providerId: user.uid,
//             isSold: false,
//             name,
//             type,
//             price,
//             location,
//             latitude,
//             longitude,
//             helmetsIncluded, // Store helmetsIncluded status
//         });

//         // Reset form fields after successful submission
//         setName("");
//         setType("Bike");
//         setPrice("");
//         setLocation("");
//         setLatitude(null);
//         setLongitude(null);
//         setHelmetsIncluded(false); // Reset the helmetsIncluded field
//         alert("Vehicle added successfully!");
//     } catch (error) {
//         alert("Error adding vehicle. Please try again.");
//     }

//     setLoading(false);
// };


//   return (
//     <div className="flex h-screen flex-col items-center gap-3 border pl-7 pr-7 pt-4">
//       <h2 className="text-center text-2xl font-semibold text-black">
//         Add New Vehicle
//       </h2>
//       <img
//         className="h-36 rounded drop-shadow-[1px_1px_90px_#c53838]"
//         src={Vahana[name]?.[0]}
//         alt=""
//       />
//       <div className="space-y-4 w-full">
//         <div className="flex items-center gap-4">
//           {/* Vehicle Name Input */}
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Vehicle Name"
//               value={name}
//               onChange={handleNameChange}
//               required
//               className="w-full rounded border p-2"
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute mt-1 w-full rounded border bg-white shadow-md">
//                 {suggestions.map((suggestion) => (
//                   <li
//                     key={suggestion}
//                     onClick={() => handleSuggestionClick(suggestion)}
//                     className="cursor-pointer p-2 hover:bg-gray-200"
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Helmets Included Checkbox */}
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="helmetsIncluded"
//               checked={helmetsIncluded}
//               onChange={() => setHelmetsIncluded(!helmetsIncluded)}
//               className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-green-500 focus:ring-0"
//             />
//             <label
//               htmlFor="helmetsIncluded"
//               className="ml-2 text-sm text-gray-700"
//             >
//               Helmets
//             </label>
//           </div>
//         </div>

//         <div className="flex gap-1">
//           <div className="flex w-[70%] items-center justify-evenly rounded border bg-white">
//             <img className="h-6 w-6" src={Rupee} alt="" />
//             <input
//               type="number"
//               placeholder="Price per Day"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               className="w-[84%] border-l-2 border-yellow-400 p-2"
//             />
//           </div>

//           <select
//             className="w-[30%] rounded"
//             name="Vehicle type"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="Bike">Bike</option>
//             <option value="Scooter">Scooter</option>
//           </select>
//         </div>

//         <button
//           type="button"
//           onClick={LocationFetching}
//           className="mt-2 w-full rounded bg-green-500 p-2 text-white hover:bg-green-600 disabled:bg-gray-400"
//           disabled={loading} // Disable while fetching
//         >
//           {loading ? "Fetching Location..." : "Use Current Location"}
//         </button>

//         <Adding handleSubmit={handleSubmit} loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default AddVehicle;


// import Adding from "./Adding";
// import Rupee from "../images/Rupee.png";
// import { getAuth } from "firebase/auth";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getFirestore, collection, addDoc } from "firebase/firestore";

// const AddVehicle = () => {
//   const { Vahana } = useAuth();
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [type, setType] = useState("Bike");
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [helmetsIncluded, setHelmetsIncluded] = useState(false);

//   const auth = getAuth();
//   const db = getFirestore();

//   const handleNameChange = (e) => {
//     const input = e.target.value;
//     setName(input);

//     const matches = Object.keys(Vahana).filter((EV) =>
//       EV.toLowerCase().includes(input.toLowerCase())
//     );
//     setSuggestions(matches);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setName(suggestion);
//     setSuggestions([]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const user = auth.currentUser;

//     if (!user) {
//       alert("User is not authenticated");
//       setLoading(false);
//       return;
//     }

//     // Validation: Ensure all fields are valid
//     if (!name.trim()) {
//       alert("Vehicle name cannot be empty. Please select a valid name.");
//       setLoading(false);
//       return;
//     }

//     if (!Object.keys(Vahana).includes(name)) {
//       alert("Please select a vehicle from the suggestions.");
//       setLoading(false);
//       return;
//     }

//     if (!price || isNaN(price) || Number(price) <= 0) {
//       alert("Please enter a valid price greater than 0.");
//       setLoading(false);
//       return;
//     }

//     if (!type) {
//       alert("Please select a vehicle type.");
//       setLoading(false);
//       return;
//     }

//     try {
//       await addDoc(collection(db, "vehicles"), {
//         providerId: user.uid,
//         isSold: false,
//         name,
//         type,
//         price,
//         helmetsIncluded, // Store helmetsIncluded status
//       });

//       // Reset form fields after successful submission
//       setName("");
//       setType("Bike");
//       setPrice("");
//       setHelmetsIncluded(false); // Reset the helmetsIncluded field
//       alert("Vehicle added successfully!");
//     } catch (error) {
//       alert("Error adding vehicle. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex h-screen flex-col items-center gap-3 border pl-7 pr-7 pt-4">
//       <h2 className="text-center text-2xl font-semibold text-black">
//         Add New Vehicle
//       </h2>
//       <img
//         className="h-36 rounded drop-shadow-[1px_1px_90px_#c53838]"
//         src={Vahana[name]?.[0]}
//         alt=""
//       />
//       <div className="space-y-4 w-full">
//         <div className="flex items-center gap-4">
//           {/* Vehicle Name Input */}
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Vehicle Name"
//               value={name}
//               onChange={handleNameChange}
//               required
//               className="w-full rounded border p-2"
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute mt-1 w-full rounded border bg-white shadow-md">
//                 {suggestions.map((suggestion) => (
//                   <li
//                     key={suggestion}
//                     onClick={() => handleSuggestionClick(suggestion)}
//                     className="cursor-pointer p-2 hover:bg-gray-200"
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Helmets Included Checkbox */}
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="helmetsIncluded"
//               checked={helmetsIncluded}
//               onChange={() => setHelmetsIncluded(!helmetsIncluded)}
//               className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-green-500 focus:ring-0"
//             />
//             <label
//               htmlFor="helmetsIncluded"
//               className="ml-2 text-sm text-gray-700"
//             >
//               Helmets
//             </label>
//           </div>
//         </div>

//         <div className="flex gap-1">
//           <div className="flex w-[70%] items-center justify-evenly rounded border bg-white">
//             <img className="h-6 w-6" src={Rupee} alt="" />
//             <input
//               type="number"
//               placeholder="Price per Day"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               className="w-[84%] border-l-2 border-yellow-400 p-2"
//             />
//           </div>

//           <select
//             className="w-[30%] rounded"
//             name="Vehicle type"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="Bike">Bike</option>
//             <option value="Scooter">Scooter</option>
//           </select>
//         </div>

//         <Adding handleSubmit={handleSubmit} loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default AddVehicle;



import Adding from "./Adding";
import Rupee from "../images/Rupee.png";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddVehicle = () => {
  const { Vahana } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Bike");
  const [registrationNo, setRegistrationNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [helmetsIncluded, setHelmetsIncluded] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);

    const matches = Object.keys(Vahana).filter((EV) =>
      EV.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion);
    setSuggestions([]);
  };

  // Adjusted validation regex to match specific formats with optional spaces
const registrationNoPattern = /^[A-Z]{2}\s?[0-9]{2}\s?[A-Z]{1,2}\s?[0-9]{4}$/; // Example: KA 01 AB 1234

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const user = auth.currentUser;

  if (!user) {
    alert("User is not authenticated");
    setLoading(false);
    return;
  }

  // Validation: Ensure all fields are valid
  if (!name.trim()) {
    alert("Vehicle name cannot be empty. Please select a valid name.");
    setLoading(false);
    return;
  }

  if (!Object.keys(Vahana).includes(name)) {
    alert("Please select a vehicle from the suggestions.");
    setLoading(false);
    return;
  }

  if (!price || isNaN(price) || Number(price) <= 0) {
    alert("Please enter a valid price greater than 0.");
    setLoading(false);
    return;
  }

  if (!type) {
    alert("Please select a vehicle type.");
    setLoading(false);
    return;
  }

  if (!registrationNo.trim()) {
    alert("Vehicle registration number cannot be empty.");
    setLoading(false);
    return;
  }

  // Normalize spaces for validation
  const normalizedRegistrationNo = registrationNo.replace(/\s+/g, " ").trim(); // Replace multiple spaces with a single space

  if (!registrationNoPattern.test(normalizedRegistrationNo)) {
    alert(
      "Invalid registration number format. Example of valid format: KA 01 AB 1234"
    );
    setLoading(false);
    return;
  }

  try {
    await addDoc(collection(db, "vehicles"), {
      providerId: user.uid,
      isSold: false,
      name,
      type,
      price,
      registrationNo: normalizedRegistrationNo, // Save with spaces preserved
      helmetsIncluded,
    });

    // Reset form fields after successful submission
    setName("");
    setType("Bike");
    setPrice("");
    setRegistrationNo("");
    setHelmetsIncluded(false);
  } catch (error) {
    alert("Error adding vehicle. Please try again.");
  }

  setLoading(false);
};

  return (
    <div className="flex h-screen flex-col items-center gap-3 border pl-7 pr-7 pt-4">
      <h2 className="text-center text-2xl font-semibold text-black">
        Add New Vehicle
      </h2>
      <img
        className="h-36 rounded drop-shadow-[1px_1px_90px_#c53838]"
        src={Vahana[name]?.[0]}
        alt=""
      />
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-4">
          {/* Vehicle Name Input */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Vehicle Name"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full rounded border p-2"
            />
            {suggestions.length > 0 && (
              <ul className="absolute mt-1 w-full rounded border bg-white shadow-md">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Helmets Included Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="helmetsIncluded"
              checked={helmetsIncluded}
              onChange={() => setHelmetsIncluded(!helmetsIncluded)}
              className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-green-500 focus:ring-0"
            />
            <label
              htmlFor="helmetsIncluded"
              className="ml-2 text-sm text-gray-700"
            >
              Helmets
            </label>
          </div>
        </div>

        <div className="flex gap-1">
          <div className="flex w-[70%] items-center justify-evenly rounded border bg-white">
            <img className="h-6 w-6" src={Rupee} alt="" />
            <input
              type="number"
              placeholder="Price per Day"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-[84%] border-l-2 border-yellow-400 p-2"
            />
          </div>

          <select
            className="w-[30%] rounded"
            name="Vehicle type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>

        {/* Vehicle Registration Number Input */}
        <input
          type="text"
          placeholder="Vehicle Registration Number"
          value={registrationNo}
          onChange={(e) => setRegistrationNo(e.target.value.toUpperCase())} // Convert to uppercase
          required
          className="w-full rounded border p-2"
        />


        <Adding handleSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddVehicle;