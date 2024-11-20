// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { Link } from "react-router-dom";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const db = getFirestore();

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersRef = collection(db, "users");
//       const userSnapshot = await getDocs(usersRef);
//       const userList = userSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(userList);
//     };

//     fetchUsers();
//   }, [db]);

//   // Change user role
//   const handleChangeRole = async (id, role) => {
//     const userRef = doc(db, "users", id);
//     await updateDoc(userRef, {
//       role: role,
//     });
//     setUsers(
//       users.map((user) => (user.id === id ? { ...user, role: role } : user)),
//     );
//   };

//   // Delete a user
//   const handleDelete = async (id) => {
//     const userRef = doc(db, "users", id);
//     await deleteDoc(userRef);
//     setUsers(users.filter((user) => user.id !== id)); // Update UI after delete
//   };

//   return (
//     <div className="p-4">
//       <h2 className="mb-6 text-3xl font-bold">Manage Users</h2>
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {users.map((user) => (
//           <div key={user.id} className="rounded bg-white p-4 shadow">
//             <h3 className="font-semibold">{user.name}</h3>
//             <p>{user.email}</p>
//             <p>Role: {user.role}</p>
//             <button
//               onClick={() =>
//                 handleChangeRole(
//                   user.id,
//                   user.role === "admin" ? "vehicle provider" : "admin",
//                 )
//               }
//               className="ml-2 text-blue-500 hover:text-blue-700"
//             >
//               Toggle Role
//             </button>
//             <button
//               onClick={() => handleDelete(user.id)}
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

// export default ManageUsers;

// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedUserId, setExpandedUserId] = useState(null);
//   const [userVehicles, setUserVehicles] = useState([]);
//   const [vehicleBeingEdited, setVehicleBeingEdited] = useState(null);
//   const [vehicleForm, setVehicleForm] = useState({
//     name: "",
//     price: "",
//     location: "",
//     type: "",
//   });
//   const [selectedVehicleType, setSelectedVehicleType] = useState("All");
//   const db = getFirestore();

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const usersRef = collection(db, "users");
//         const userSnapshot = await getDocs(usersRef);
//         const userList = userSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUsers(userList);
//       } catch (error) {
//         console.error("Error fetching users: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [db]);

//   // Fetch vehicles of a user
//   const fetchUserVehicles = async (userId) => {
//     try {
//       const vehiclesRef = collection(db, "vehicles");
//       const q = query(vehiclesRef, where("providerId", "==", userId));
//       const vehicleSnapshot = await getDocs(q);
//       const vehicleList = vehicleSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUserVehicles(vehicleList);
//     } catch (error) {
//       console.error("Error fetching vehicles: ", error);
//     }
//   };

//   // Handle expanding user details
//   const handleUserExpand = async (userId) => {
//     if (expandedUserId === userId) {
//       setExpandedUserId(null); // Collapse if the same user is clicked again
//     } else {
//       setExpandedUserId(userId); // Expand user details
//       fetchUserVehicles(userId); // Fetch vehicles of the clicked user
//     }
//   };

//   // Handle edit vehicle
//   const handleEditVehicle = (vehicle) => {
//     setVehicleBeingEdited(vehicle.id);
//     setVehicleForm({
//       name: vehicle.name,
//       price: vehicle.price,
//       location: vehicle.location,
//       type: vehicle.type,
//     });
//   };

//   // Handle vehicle form changes
//   const handleVehicleFormChange = (e) => {
//     const { name, value } = e.target;
//     setVehicleForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   // Handle vehicle form submission
//   const handleSubmitVehicleEdit = async (e) => {
//     e.preventDefault();
//     if (vehicleBeingEdited) {
//       try {
//         const vehicleRef = doc(db, "vehicles", vehicleBeingEdited);
//         await updateDoc(vehicleRef, vehicleForm);

//         // Update the local userVehicles state
//         setUserVehicles(
//           userVehicles.map((vehicle) =>
//             vehicle.id === vehicleBeingEdited ? { ...vehicle, ...vehicleForm } : vehicle
//           )
//         );

//         // Clear the form and reset the editing state
//         setVehicleBeingEdited(null);
//         setVehicleForm({
//           name: "",
//           price: "",
//           location: "",
//           type: "",
//         });
//       } catch (error) {
//         console.error("Error updating vehicle: ", error);
//       }
//     }
//   };

//   // Delete a vehicle
//   const handleDeleteVehicle = async (vehicleId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
//     if (confirmDelete) {
//       try {
//         const vehicleRef = doc(db, "vehicles", vehicleId);
//         await deleteDoc(vehicleRef);
//         setUserVehicles(userVehicles.filter((vehicle) => vehicle.id !== vehicleId));
//       } catch (error) {
//         console.error("Error deleting vehicle: ", error);
//       }
//     }
//   };

//   // Change user role
//   const handleChangeRole = async (id, role) => {
//     try {
//       const userRef = doc(db, "users", id);
//       await updateDoc(userRef, {
//         role: role,
//       });
//       setUsers(
//         users.map((user) => (user.id === id ? { ...user, role: role } : user))
//       );
//     } catch (error) {
//       console.error("Error updating user role: ", error);
//     }
//   };

//   // Delete a user
//   const handleDeleteUser = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (confirmDelete) {
//       try {
//         const userRef = doc(db, "users", id);
//         await deleteDoc(userRef);
//         setUsers(users.filter((user) => user.id !== id));
//       } catch (error) {
//         console.error("Error deleting user: ", error);
//       }
//     }
//   };

//   // Filter vehicles by selected type
//   const filteredVehicles = selectedVehicleType === "All"
//     ? userVehicles
//     : userVehicles.filter((vehicle) => vehicle.type === selectedVehicleType);

//   // Spinner while loading
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div
//           role="status"
//           aria-live="polite"
//           className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"
//         ></div>
//         <p className="sr-only">Loading...</p> {/* For screen readers */}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="mb-6 text-3xl font-semibold text-gray-800">Manage Users</h2>

//       {/* Vehicle Type Filter Bar */}
//       <div className="mb-6 flex space-x-4">
//         <button
//           onClick={() => setSelectedVehicleType("All")}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none"
//         >
//           All
//         </button>
//         <button
//           onClick={() => setSelectedVehicleType("Scooter")}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none"
//         >
//           Scooter
//         </button>
//         <button
//           onClick={() => setSelectedVehicleType("Car")}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none"
//         >
//           Car
//         </button>
//         <button
//           onClick={() => setSelectedVehicleType("Bike")}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none"
//         >
//           Bike
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {users.length === 0 ? (
//           <div className="col-span-3 p-4 text-center bg-white shadow-md rounded-lg">
//             <p className="text-xl text-gray-500">No users found.</p>
//           </div>
//         ) : (
//           users.map((user) => (
//             <div
//               key={user.id}
//               className="rounded-lg bg-white p-6 shadow-md border border-gray-200"
//             >
//               <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
//               <p className="text-gray-600">{user.email}</p>
//               <p className="mt-2 text-sm text-gray-500">Role: {user.role}</p>
//               <div className="mt-4 space-x-4">
//                 <button
//                   onClick={() =>
//                     handleChangeRole(
//                       user.id,
//                       user.role === "admin" ? "vehicle provider" : "admin"
//                     )
//                   }
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none"
//                 >
//                   Toggle Role
//                 </button>
//                 <button
//                   onClick={() => handleDeleteUser(user.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none"
//                 >
//                   Delete User
//                 </button>
//               </div>

//               {/* Toggle Vehicles */}
//               <div className="mt-4">
//                 <button
//                   onClick={() => handleUserExpand(user.id)}
//                   className="bg-gray-300 text-black px-4 py-2 rounded-md focus:outline-none"
//                 >
//                   {expandedUserId === user.id ? "Hide Vehicles" : "Show Vehicles"}
//                 </button>
//                 {expandedUserId === user.id && (
//                   <div className="mt-4">
//                     {filteredVehicles.length === 0 ? (
//                       <p className="text-center text-gray-500">No vehicles found.</p>
//                     ) : (
//                       filteredVehicles.map((vehicle) => (
//                         <div key={vehicle.id} className="mb-4">
//                           <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow">
//                             <div className="space-y-2">
//                               <p className="text-gray-800">{vehicle.name}</p>
//                               <p className="text-gray-600">Price: {vehicle.price}</p>
//                             </div>
//                             <div className="space-x-2">
//                               <button
//                                 onClick={() => handleEditVehicle(vehicle)}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteVehicle(vehicle.id)}
//                                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                           {/* Edit Form for Vehicle */}
//                           {vehicleBeingEdited === vehicle.id && (
//                             <div className="mt-4">
//                               <form onSubmit={handleSubmitVehicleEdit} className="space-y-4">
//                                 <input
//                                   type="text"
//                                   name="name"
//                                   value={vehicleForm.name}
//                                   onChange={handleVehicleFormChange}
//                                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                   placeholder="Vehicle Name"
//                                 />
//                                 <input
//                                   type="text"
//                                   name="price"
//                                   value={vehicleForm.price}
//                                   onChange={handleVehicleFormChange}
//                                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                   placeholder="Price"
//                                 />
//                                 <input
//                                   type="text"
//                                   name="location"
//                                   value={vehicleForm.location}
//                                   onChange={handleVehicleFormChange}
//                                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                   placeholder="Location"
//                                 />
//                                 <input
//                                   type="text"
//                                   name="type"
//                                   value={vehicleForm.type}
//                                   onChange={handleVehicleFormChange}
//                                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                   placeholder="Type"
//                                 />
//                                 <button
//                                   type="submit"
//                                   className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                                 >
//                                   Update Vehicle
//                                 </button>
//                               </form>
//                             </div>
//                           )}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);
  const [vehicleBeingEdited, setVehicleBeingEdited] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    price: "",
    location: "",
    type: "",
  });
  const [selectedVehicleType, setSelectedVehicleType] = useState("All");
  const db = getFirestore();

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersRef = collection(db, "users");
        const userSnapshot = await getDocs(usersRef);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [db]);

  // Fetch vehicles of a user
  const fetchUserVehicles = async (userId) => {
    try {
      const vehiclesRef = collection(db, "vehicles");
      const q = query(vehiclesRef, where("providerId", "==", userId));
      const vehicleSnapshot = await getDocs(q);
      const vehicleList = vehicleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserVehicles(vehicleList);
    } catch (error) {
      console.error("Error fetching vehicles: ", error);
    }
  };

  // Handle expanding user details
  const handleUserExpand = async (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null); // Collapse if the same user is clicked again
    } else {
      setExpandedUserId(userId); // Expand user details
      fetchUserVehicles(userId); // Fetch vehicles of the clicked user
    }
  };

  // Handle edit vehicle
  const handleEditVehicle = (vehicle) => {
    setVehicleBeingEdited(vehicle.id);
    setVehicleForm({
      name: vehicle.name,
      price: vehicle.price,
      location: vehicle.location,
      type: vehicle.type,
    });
  };

  // Handle vehicle form changes
  const handleVehicleFormChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle vehicle form submission
  const handleSubmitVehicleEdit = async (e) => {
    e.preventDefault();
    if (vehicleBeingEdited) {
      try {
        const vehicleRef = doc(db, "vehicles", vehicleBeingEdited);
        await updateDoc(vehicleRef, vehicleForm);

        // Update the local userVehicles state
        setUserVehicles(
          userVehicles.map((vehicle) =>
            vehicle.id === vehicleBeingEdited
              ? { ...vehicle, ...vehicleForm }
              : vehicle,
          ),
        );

        // Clear the form and reset the editing state
        setVehicleBeingEdited(null);
        setVehicleForm({
          name: "",
          price: "",
          location: "",
          type: "",
        });
      } catch (error) {
        console.error("Error updating vehicle: ", error);
      }
    }
  };

  // Delete a vehicle
  const handleDeleteVehicle = async (vehicleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?",
    );
    if (confirmDelete) {
      try {
        const vehicleRef = doc(db, "vehicles", vehicleId);
        await deleteDoc(vehicleRef);
        setUserVehicles(
          userVehicles.filter((vehicle) => vehicle.id !== vehicleId),
        );
      } catch (error) {
        console.error("Error deleting vehicle: ", error);
      }
    }
  };

  // Change user role
  const handleChangeRole = async (id, role) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        role: role,
      });
      setUsers(
        users.map((user) => (user.id === id ? { ...user, role: role } : user)),
      );
    } catch (error) {
      console.error("Error updating user role: ", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (confirmDelete) {
      try {
        const userRef = doc(db, "users", id);
        await deleteDoc(userRef);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    }
  };

  // Filter vehicles by selected type and sort them alphabetically
  const filteredVehicles =
    selectedVehicleType === "All"
      ? userVehicles
      : userVehicles.filter((vehicle) => vehicle.type === selectedVehicleType);

  // Sort vehicles alphabetically by name
  const sortedVehicles = filteredVehicles.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  // Spinner while loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div
          role="status"
          aria-live="polite"
          className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"
        ></div>
        <p className="sr-only">Loading...</p> {/* For screen readers */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">
        Manage Users
      </h2>

      {/* Vehicle Type Filter Bar */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setSelectedVehicleType("All")}
          className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none"
        >
          All
        </button>
        <button
          onClick={() => setSelectedVehicleType("Scooter")}
          className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none"
        >
          Scooter
        </button>
        <button
          onClick={() => setSelectedVehicleType("Car")}
          className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none"
        >
          Car
        </button>
        <button
          onClick={() => setSelectedVehicleType("Bike")}
          className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none"
        >
          Bike
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <div className="col-span-3 rounded-lg bg-white p-4 text-center shadow-md">
            <p className="text-xl text-gray-500">No users found.</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="mt-2 text-sm text-gray-500">Role: {user.role}</p>
              <div className="mt-4 space-x-4">
                <button
                  onClick={() =>
                    handleChangeRole(
                      user.id,
                      user.role === "admin" ? "vehicle provider" : "admin",
                    )
                  }
                  className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none"
                >
                  Toggle Role
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="rounded-md bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 focus:outline-none"
                >
                  Delete User
                </button>
              </div>

              <button
                onClick={() => handleUserExpand(user.id)}
                className="mt-4 text-blue-500 focus:outline-none"
              >
                {expandedUserId === user.id ? "Hide Vehicles" : "Show Vehicles"}
              </button>

              {expandedUserId === user.id && (
                <div className="mt-4">
                  {sortedVehicles.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No vehicles found for this provider.
                    </p>
                  ) : (
                    sortedVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="my-2 flex justify-between rounded-lg bg-gray-50 p-4 shadow-md"
                      >
                        <div>
                          <p className="font-semibold text-gray-700">
                            {vehicle.name}
                          </p>
                          <p className="text-gray-600">{vehicle.type}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleEditVehicle(vehicle)}
                            className="rounded-md bg-yellow-500 px-4 py-2 text-white shadow hover:bg-yellow-600 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="rounded-md bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 focus:outline-none"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Edit Vehicle Form */}
      {vehicleBeingEdited && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Edit Vehicle</h3>
          <form onSubmit={handleSubmitVehicleEdit}>
            <div className="mt-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={vehicleForm.name}
                onChange={handleVehicleFormChange}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={vehicleForm.price}
                onChange={handleVehicleFormChange}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={vehicleForm.location}
                onChange={handleVehicleFormChange}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Type</label>
              <select
                name="type"
                value={vehicleForm.type}
                onChange={handleVehicleFormChange}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Scooter">Scooter</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setVehicleBeingEdited(null)}
                className="rounded-md bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
