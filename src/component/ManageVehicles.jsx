// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { Link } from "react-router-dom";

// const ManageVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const db = getFirestore();

//   // Fetch all vehicles
//   useEffect(() => {
//     const fetchVehicles = async () => {
//       const vehiclesRef = collection(db, "vehicles");
//       const vehicleSnapshot = await getDocs(vehiclesRef);
//       const vehicleList = vehicleSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setVehicles(vehicleList);
//     };

//     fetchVehicles();
//   }, [db]);

//   // Delete a vehicle
//   const handleDelete = async (id) => {
//     const vehicleRef = doc(db, "vehicles", id);
//     await deleteDoc(vehicleRef);
//     setVehicles(vehicles.filter((vehicle) => vehicle.id !== id)); // Update UI after delete
//   };

//   return (
//     <div className="p-4">
//       <h2 className="mb-6 text-3xl font-bold">Manage Vehicles</h2>
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {vehicles.map((vehicle) => (
//           <div key={vehicle.id} className="rounded bg-white p-4 shadow">
//             <h3 className="font-semibold">{vehicle.name}</h3>
//             <p>{vehicle.type}</p>
//             <p>{vehicle.providerId}</p>
//             <Link
//               to={`/admin/vehicles/edit/${vehicle.id}`}
//               className="text-blue-500 hover:text-blue-700"
//             >
//               Edit
//             </Link>
//             <button
//               onClick={() => handleDelete(vehicle.id)}
//               className="ml-2 text-red-500 hover:text-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageVehicles;

// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { Link } from "react-router-dom";

// const ManageVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state
//   const db = getFirestore();

//   // Fetch all vehicles
//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const vehiclesRef = collection(db, "vehicles");
//         const vehicleSnapshot = await getDocs(vehiclesRef);
//         const vehicleList = vehicleSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setVehicles(vehicleList);
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchVehicles();
//   }, [db]);

//   // Delete a vehicle
//   const handleDelete = async (id) => {
//     const vehicleRef = doc(db, "vehicles", id);
//     try {
//       await deleteDoc(vehicleRef);
//       setVehicles(vehicles.filter((vehicle) => vehicle.id !== id)); // Update UI after delete
//     } catch (error) {
//       console.error("Error deleting vehicle:", error);
//     }
//   };

//   // Loading Spinner
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="mb-6 text-3xl font-bold text-gray-800">Manage Vehicles</h2>
//       {vehicles.length === 0 ? (
//         <p className="text-lg text-gray-600">No vehicles available</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {vehicles.map((vehicle) => (
//             <div
//               key={vehicle.id}
//               className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
//             >
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {vehicle.name}
//               </h3>
//               <p className="text-gray-600">{vehicle.type}</p>
//               <p className="text-sm text-gray-500">
//                 Provider: {vehicle.providerId}
//               </p>
//               <div className="mt-4 flex items-center justify-between">
//                 <Link
//                   to={`/admin/vehicles/edit/${vehicle.id}`}
//                   className="text-sm text-blue-500 hover:text-blue-700"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(vehicle.id)}
//                   className="text-sm text-red-500 hover:text-red-700"
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

// export default ManageVehicles;




// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   getDoc
// } from "firebase/firestore";

// const ManageVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState(null);
//   const [editMode, setEditMode] = useState(null); // For inline edit
//   const [updatedVehicle, setUpdatedVehicle] = useState({
//     name: "",
//     type: "",
//     providerId: "",
//     price: "",
//   });
//   const [filterType, setFilterType] = useState("All"); // To filter by vehicle type
//   const [sortOption, setSortOption] = useState("price"); // To sort by price or provider
//   const [searchQuery, setSearchQuery] = useState(""); // Search input
//   const db = getFirestore();

//   // Fetch all vehicles
//   useEffect(() => {
//     const fetchVehiclesAndProviders = async () => {
//       try {
//         const vehiclesRef = collection(db, "vehicles");
//         const vehicleSnapshot = await getDocs(vehiclesRef);
//         const vehicleList = vehicleSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
        
//         // Fetch providers based on providerId in the vehicles
//         const providerIds = [...new Set(vehicleList.map(vehicle => vehicle.providerId))]; // Get unique providerIds
//         const providersData = [];

//         for (let providerId of providerIds) {
//           const providerRef = doc(db, "providers", providerId);
//           const providerSnapshot = await getDoc(providerRef);
//           if (providerSnapshot.exists()) {
//             providersData.push({ id: providerSnapshot.id, ...providerSnapshot.data() });
//           }
//         }

//         setVehicles(vehicleList);
//         setProviders(providersData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehiclesAndProviders();
//   }, [db]);

//   // Handle change in input for editing
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedVehicle((prevVehicle) => ({
//       ...prevVehicle,
//       [name]: value,
//     }));
//   };

//   // Handle Save after editing
//   const handleSaveEdit = async (id) => {
//     const vehicleRef = doc(db, "vehicles", id);
//     try {
//       await updateDoc(vehicleRef, updatedVehicle);
//       setVehicles(vehicles.map((vehicle) =>
//         vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle
//       ));
//       setEditMode(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error updating vehicle:", error);
//     }
//   };

//   // Handle deletion of vehicle
//   const handleDeleteClick = (vehicleId) => {
//     setVehicleToDelete(vehicleId);
//     setShowModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (vehicleToDelete) {
//       const vehicleRef = doc(db, "vehicles", vehicleToDelete);
//       await deleteDoc(vehicleRef);
//       setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleToDelete));
//       setShowModal(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowModal(false);
//   };

//   // Sorting and Filtering Vehicles
//   const filteredVehicles = vehicles
//     .filter(vehicle => filterType === "All" || vehicle.type === filterType)
//     .filter(vehicle => {
//       // Filter based on search query (search in name or providerId)
//       return (
//         vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         vehicle.providerId.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     })
//     .sort((a, b) => {
//       if (sortOption === "price") {
//         return a.price - b.price; // Sort by price
//       } else if (sortOption === "providerId") {
//         return a.providerId.localeCompare(b.providerId); // Sort by providerId
//       }
//       return 0;
//     });

//   // Loading Spinner
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="mb-6 text-3xl font-bold text-gray-800">Manage Vehicles</h2>

//       {/* Search */}
//       <div className="mb-6">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search by name or provider..."
//           className="p-2 w-full border rounded-md"
//         />
//       </div>

//       {/* Filters and Sorting */}
//       <div className="mb-6 flex justify-between items-center">
//         <div className="flex space-x-4">
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             <option value="All">All Types</option>
//             <option value="Bike">Bike</option>
//             <option value="Scooter">Scooter</option>
//             <option value="Car">Car</option>
//           </select>

//           <select
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             <option value="price">Sort by Price</option>
//             <option value="providerId">Sort by Provider</option>
//           </select>
//         </div>
//       </div>

//       {/* No Vehicles Message */}
//       {filteredVehicles.length === 0 ? (
//         <p className="text-lg text-gray-600">No vehicles available</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredVehicles.map((vehicle) => {
//             const provider = providers.find(p => p.id === vehicle.providerId);
//             return (
//               <div
//                 key={vehicle.id}
//                 className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
//               >
//                 {/* Inline Edit Mode */}
//                 {editMode === vehicle.id ? (
//                   <div>
//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={updatedVehicle.name}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Type</label>
//                       <select
//                         name="type"
//                         value={updatedVehicle.type}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       >
//                         <option value="Bike">Bike</option>
//                         <option value="Scooter">Scooter</option>
//                         <option value="Car">Car</option>
//                       </select>
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Provider ID</label>
//                       <input
//                         type="text"
//                         name="providerId"
//                         value={updatedVehicle.providerId}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Price</label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={updatedVehicle.price}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>

//                     <button
//                       onClick={() => handleSaveEdit(vehicle.id)}
//                       className="bg-blue-500 text-white px-6 py-2 rounded-md"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800">{vehicle.name}</h3>
//                     <p className="text-gray-600">{vehicle.type}</p>
//                     <p className="text-sm text-gray-500">Provider: {provider ? provider.name : "Unknown"}</p>
//                     <p className="text-sm text-gray-500">Provider Email: {provider ? provider.email : "N/A"}</p>
//                     <p className="text-sm text-gray-500">Price: ₹{vehicle.price}</p>
//                     <div className="mt-4 flex items-center justify-between">
//                       <button
//                         onClick={() => {
//                           setEditMode(vehicle.id);
//                           setUpdatedVehicle(vehicle);
//                         }}
//                         className="text-sm text-blue-500 hover:text-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(vehicle.id)}
//                         className="text-sm text-red-500 hover:text-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal for Delete Confirmation */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg">
//             <p>Are you sure you want to delete this vehicle?</p>
//             <div className="mt-4 flex space-x-4">
//               <button
//                 onClick={handleConfirmDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={handleCancelDelete}
//                 className="bg-gray-300 text-black px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageVehicles;





// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   getDoc
// } from "firebase/firestore";

// const ManageVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState(null);
//   const [editMode, setEditMode] = useState(null); // For inline edit
//   const [updatedVehicle, setUpdatedVehicle] = useState({
//     name: "",
//     type: "",
//     providerId: "",
//     price: "",
//   });
//   const [filterType, setFilterType] = useState("All"); // To filter by vehicle type
//   const [sortOption, setSortOption] = useState("price"); // To sort by price or provider
//   const [searchQuery, setSearchQuery] = useState(""); // Search input
//   const db = getFirestore();

//   // Fetch all vehicles
//   useEffect(() => {
//     const fetchVehiclesAndProviders = async () => {
//       try {
//         const vehiclesRef = collection(db, "vehicles");
//         const vehicleSnapshot = await getDocs(vehiclesRef);
//         const vehicleList = vehicleSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
        
//         // Fetch providers based on providerId in the vehicles
//         const providerIds = [...new Set(vehicleList.map(vehicle => vehicle.providerId))]; // Get unique providerIds
//         const providersData = [];

//         for (let providerId of providerIds) {
//           const providerRef = doc(db, "providers", providerId);
//           const providerSnapshot = await getDoc(providerRef);
//           if (providerSnapshot.exists()) {
//             providersData.push({ id: providerSnapshot.id, ...providerSnapshot.data() });
//           }
//         }

//         setVehicles(vehicleList);
//         setProviders(providersData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehiclesAndProviders();
//   }, [db]);

//   // Handle change in input for editing
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedVehicle((prevVehicle) => ({
//       ...prevVehicle,
//       [name]: value,
//     }));
//   };

//   // Handle Save after editing
//   const handleSaveEdit = async (id) => {
//     const vehicleRef = doc(db, "vehicles", id);
//     try {
//       await updateDoc(vehicleRef, updatedVehicle);
//       setVehicles(vehicles.map((vehicle) =>
//         vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle
//       ));
//       setEditMode(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error updating vehicle:", error);
//     }
//   };

//   // Handle deletion of vehicle
//   const handleDeleteClick = (vehicleId) => {
//     setVehicleToDelete(vehicleId);
//     setShowModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (vehicleToDelete) {
//       const vehicleRef = doc(db, "vehicles", vehicleToDelete);
//       await deleteDoc(vehicleRef);
//       setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleToDelete));
//       setShowModal(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowModal(false);
//   };

//   // Sorting and Filtering Vehicles
//   const filteredVehicles = vehicles
//     .filter(vehicle => filterType === "All" || vehicle.type === filterType)
//     .filter(vehicle => {
//       // Filter based on search query (search in name or providerId)
//       return (
//         vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         vehicle.providerId.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     })
//     .sort((a, b) => {
//       if (sortOption === "price") {
//         return a.price - b.price; // Sort by price
//       } else if (sortOption === "providerId") {
//         return a.providerId.localeCompare(b.providerId); // Sort by providerId
//       }
//       return 0;
//     });

//   // Count vehicles by type
//   const vehicleTypeCounts = vehicles.reduce((acc, vehicle) => {
//     acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
//     return acc;
//   }, {});

//   // Loading Spinner
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="mb-6 text-3xl font-bold text-gray-800">Manage Vehicles</h2>

//       {/* Search */}
//       <div className="mb-6">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search by name or provider..."
//           className="p-2 w-full border rounded-md"
//         />
//       </div>

//       {/* Filters and Sorting */}
//       <div className="mb-6 flex justify-between items-center">
//         <div className="flex space-x-4">
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             <option value="All">All Types</option>
//             <option value="Bike">
//               Bike ({vehicleTypeCounts["Bike"] || 0})
//             </option>
//             <option value="Scooter">
//               Scooter ({vehicleTypeCounts["Scooter"] || 0})
//             </option>
//             <option value="Car">
//               Car ({vehicleTypeCounts["Car"] || 0})
//             </option>
//           </select>

//           <select
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             className="p-2 border rounded-md"
//           >
//             <option value="price">Sort by Price</option>
//             <option value="providerId">Sort by Provider</option>
//           </select>
//         </div>
//       </div>

//       {/* No Vehicles Message */}
//       {filteredVehicles.length === 0 ? (
//         <p className="text-lg text-gray-600">No vehicles available</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredVehicles.map((vehicle) => {
//             const provider = providers.find(p => p.id === vehicle.providerId);
//             return (
//               <div
//                 key={vehicle.id}
//                 className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
//               >
//                 {/* Inline Edit Mode */}
//                 {editMode === vehicle.id ? (
//                   <div>
//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={updatedVehicle.name}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Type</label>
//                       <select
//                         name="type"
//                         value={updatedVehicle.type}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       >
//                         <option value="Bike">Bike</option>
//                         <option value="Scooter">Scooter</option>
//                         <option value="Car">Car</option>
//                       </select>
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Provider ID</label>
//                       <input
//                         type="text"
//                         name="providerId"
//                         value={updatedVehicle.providerId}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700">Price</label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={updatedVehicle.price}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>

//                     <button
//                       onClick={() => handleSaveEdit(vehicle.id)}
//                       className="bg-blue-500 text-white px-6 py-2 rounded-md"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800">{vehicle.name}</h3>
//                     <p className="text-gray-600">{vehicle.type}</p>
//                     <p className="text-sm text-gray-500">Provider: {provider ? provider.name : "Unknown"}</p>
//                     <p className="text-sm text-gray-500">Provider Email: {provider ? provider.email : "N/A"}</p>
//                     <p className="text-sm text-gray-500">Price: ₹{vehicle.price}</p>
//                     <div className="mt-4 flex items-center justify-between">
//                       <button
//                         onClick={() => {
//                           setEditMode(vehicle.id);
//                           setUpdatedVehicle(vehicle);
//                         }}
//                         className="text-sm text-blue-500 hover:text-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(vehicle.id)}
//                         className="text-sm text-red-500 hover:text-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal for Delete Confirmation */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg">
//             <p>Are you sure you want to delete this vehicle?</p>
//             <div className="mt-4 flex space-x-4">
//               <button
//                 onClick={handleConfirmDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={handleCancelDelete}
//                 className="bg-gray-300 text-black px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageVehicles;
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [editMode, setEditMode] = useState(null); // For inline edit
  const [updatedVehicle, setUpdatedVehicle] = useState({
    name: "",
    type: "",
    providerId: "",
    price: "",
  });
  const [filterType, setFilterType] = useState("All"); // To filter by vehicle type
  const [sortOption, setSortOption] = useState("price"); // To sort by price or provider
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const db = getFirestore();

  // Fetch all vehicles and providers
  useEffect(() => {
    const fetchVehiclesAndProviders = async () => {
      try {
        const vehiclesRef = collection(db, "vehicles");
        const vehicleSnapshot = await getDocs(vehiclesRef);
        const vehicleList = vehicleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch providers for each vehicle based on providerId
        const providerIds = [...new Set(vehicleList.map((vehicle) => vehicle.providerId))]; // Get unique providerIds
        const providersData = {};

        // Fetch each provider's details
        for (let providerId of providerIds) {
          const userRef = doc(db, "users", providerId);  // Assuming 'users' collection contains provider data
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            providersData[providerId] = userSnapshot.data();
          }
        }

        setVehicles(vehicleList);
        setProviders(providersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiclesAndProviders();
  }, [db]);

  // Handle change in input for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  // Handle Save after editing
  const handleSaveEdit = async (id) => {
    const vehicleRef = doc(db, "vehicles", id);
    try {
      await updateDoc(vehicleRef, updatedVehicle);
      setVehicles(vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle
      ));
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  // Handle deletion of vehicle
  const handleDeleteClick = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (vehicleToDelete) {
      const vehicleRef = doc(db, "vehicles", vehicleToDelete);
      await deleteDoc(vehicleRef);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleToDelete));
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  // Sorting and Filtering Vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => filterType === "All" || vehicle.type === filterType)
    .filter(vehicle => {
      // Filter based on search query (search in name or providerId)
      return (
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.providerId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOption === "price") {
        return a.price - b.price; // Sort by price
      } else if (sortOption === "providerId") {
        return a.providerId.localeCompare(b.providerId); // Sort by providerId
      }
      return 0;
    });

  // Count vehicles by type
  const vehicleTypeCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
    return acc;
  }, {});

  // Loading Spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Manage Vehicles</h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or provider..."
          className="p-2 w-full border rounded-md"
        />
      </div>

      {/* Filters and Sorting */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="All">All Types</option>
            <option value="Bike">
              Bike ({vehicleTypeCounts["Bike"] || 0})
            </option>
            <option value="Scooter">
              Scooter ({vehicleTypeCounts["Scooter"] || 0})
            </option>
            <option value="Car">
              Car ({vehicleTypeCounts["Car"] || 0})
            </option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="price">Sort by Price</option>
            <option value="providerId">Sort by Provider</option>
          </select>
        </div>
      </div>

      {/* No Vehicles Message */}
      {filteredVehicles.length === 0 ? (
        <p className="text-lg text-gray-600">No vehicles available</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => {
            const provider = providers[vehicle.providerId]; // Fetch the provider from the `providers` state
            return (
              <div
                key={vehicle.id}
                className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
              >
                {/* Inline Edit Mode */}
                {editMode === vehicle.id ? (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={updatedVehicle.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700">Type</label>
                      <select
                        name="type"
                        value={updatedVehicle.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Bike">Bike</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Car">Car</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700">Provider ID</label>
                      <input
                        type="text"
                        name="providerId"
                        value={updatedVehicle.providerId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={updatedVehicle.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <button
                      onClick={() => handleSaveEdit(vehicle.id)}
                      className="bg-blue-500 text-white px-6 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{vehicle.name}</h3>
                    <p className="text-gray-600">{vehicle.type}</p>
                    <p className="text-sm text-gray-500">
                      Provider: {provider ? provider.name : "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Provider ID: {vehicle.providerId} {/* Show Provider ID */}
                    </p>
                    <p className="text-sm text-gray-500">
                      Provider Email: {provider ? provider.email : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">Price: ₹{vehicle.price}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditMode(vehicle.id);
                          setUpdatedVehicle(vehicle);
                        }}
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(vehicle.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>Are you sure you want to delete this vehicle?</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVehicles;