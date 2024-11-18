import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const userSnapshot = await getDocs(usersRef);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, [db]);

  // Change user role
  const handleChangeRole = async (id, role) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      role: role,
    });
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: role } : user)),
    );
  };

  // Delete a user
  const handleDelete = async (id) => {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    setUsers(users.filter((user) => user.id !== id)); // Update UI after delete
  };

  return (
    <div className="p-4">
      <h2 className="mb-6 text-3xl font-bold">Manage Users</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="rounded bg-white p-4 shadow">
            <h3 className="font-semibold">{user.name}</h3>
            <p>{user.email}</p>
            <p>Role: {user.role}</p>
            <button
              onClick={() =>
                handleChangeRole(
                  user.id,
                  user.role === "admin" ? "vehicle provider" : "admin",
                )
              }
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              Toggle Role
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
