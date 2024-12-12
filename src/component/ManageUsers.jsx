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

export default function ManageUsers () {
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
      // location: vehicle.location,
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
              : vehicle
          )
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
      "Are you sure you want to delete this vehicle?"
    );
    if (confirmDelete) {
      try {
        const vehicleRef = doc(db, "vehicles", vehicleId);
        await deleteDoc(vehicleRef);
        setUserVehicles(
          userVehicles.filter((vehicle) => vehicle.id !== vehicleId)
        );
      } catch (error) {
        console.error("Error deleting vehicle: ", error);
      }
    }
  };

  // Change user role with a dropdown selection
  const handleChangeRole = async (id, newRole) => {
    if (newRole === "admin" && users.find((user) => user.id === id).role === "admin") {
      alert("This user is already an Admin.");
      return;
    }

    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { role: newRole });

      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role: ", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
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

  // Group vehicles by their type
  const groupVehiclesByType = (vehicles) => {
    return vehicles.reduce((acc, vehicle) => {
      const { type } = vehicle;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += 1;
      return acc;
    }, {});
  };

  // Get counts of vehicles by type
  const getVehicleCountsByType = (userId) => {
    const userVehiclesOfThisUser = userVehicles.filter(
      (vehicle) => vehicle.providerId === userId
    );
    return groupVehiclesByType(userVehiclesOfThisUser);
  };

  // Filter vehicles by selected type and sort them alphabetically
  const filteredVehicles =
    selectedVehicleType === "All"
      ? userVehicles
      : userVehicles.filter((vehicle) => vehicle.type === selectedVehicleType);

  // Sort vehicles alphabetically by name
  const sortedVehicles = filteredVehicles.sort((a, b) =>
    a.name.localeCompare(b.name)
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
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">Manage Users</h2>

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
          users.map((user) => {
            const vehicleCounts = getVehicleCountsByType(user.id);

            return (
              <div
                key={user.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">User ID: {user.id}</p>
                <p className="text-gray-600">Role: {user.role}</p>
                <p className={` text-gray-600`}>Subscription Status : {user.isPaid ? <span className="text-blue-500 font-semibold">Active</span> : <span className="text-red-600">Expired</span> }</p>

                <div className="mt-4">
                  <p className="text-gray-600">Vehicle Counts:</p>
                  <ul className="">
                    <li>Scooters: {vehicleCounts["Scooter"] || 0}</li>
                    <li>Cars: {vehicleCounts["Car"] || 0}</li>
                    <li>Bikes: {vehicleCounts["Bike"] || 0}</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Change Role</label>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleChangeRole(user.id, e.target.value)
                    }
                    className="w-40 rounded-md border border-gray-300 p-2 mt-2"
                  >
                    <option value="vehicle provider">Vehicle Provider</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="rounded-md bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 focus:outline-none"
                  >
                    Delete User
                  </button>

                  <button
                    onClick={() => handleUserExpand(user.id)}
                    className="rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                  >
                    {expandedUserId === user.id
                      ? "Hide Details"
                      : "Show Details"}
                  </button>
                </div>

                {expandedUserId === user.id && (
                  <div className="mt-4 space-y-4">
                    <h4 className="text-xl font-semibold">Vehicles:</h4>
                    {sortedVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-md"
                      >
                        <h5 className="text-lg font-semibold text-gray-800">
                          {vehicle.name}
                        </h5>
                        <p className="text-gray-600">Price: ₹{vehicle.price}</p>
                        <p className="text-gray-600">Location: {vehicle.location}</p>
                        <p className="text-gray-600">Type: {vehicle.type}</p>

                        <div className="mt-4 space-x-4">
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
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Vehicle Edit Form */}
      {vehicleBeingEdited && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <form
            onSubmit={handleSubmitVehicleEdit}
            className="rounded-lg bg-white p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">Edit Vehicle</h3>
            <div className="mt-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={vehicleForm.name}
                onChange={handleVehicleFormChange}
                className="w-full rounded-md border border-gray-300 p-2 mt-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={vehicleForm.price}
                onChange={handleVehicleFormChange}
                className="w-full rounded-md border border-gray-300 p-2 mt-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={vehicleForm.location}
                onChange={handleVehicleFormChange}
                className="w-full rounded-md border border-gray-300 p-2 mt-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Type</label>
              <select
                name="type"
                value={vehicleForm.type}
                onChange={handleVehicleFormChange}
                className="w-full rounded-md border border-gray-300 p-2 mt-2"
              >
                <option value="Scooter">Scooter</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
            <div className="mt-4 flex space-x-4">
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