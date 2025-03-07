// import React from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";
import AccountDelete from "./AccountDelete";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const handleDelete = async (user) => {
    const vehiclesRef = collection(db, "vehicles");
    const q = query(vehiclesRef, where("providerId", "==", user));
    try {
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref),
      );
      await Promise.all(deletePromises);
      await deleteDoc(doc(db, "users", user));
    } catch (error) {
      console.error("Error deleting user or vehicles:", error);
      alert("Failed to delete user or vehicles. Please try again.");
    }
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user is logged in.");
      return;
    }
    const provider = new GoogleAuthProvider();
    await reauthenticateWithPopup(user, provider);
    alert("Reauthenticated successfully.");
    const res = confirm("Do you want to Delete your account");
    if (res) {
      await handleDelete(user.uid);
      await deleteUser(user);
      window.location.href = "/";
      alert("Account deleted successfully.");
    }
  };
  return (
    <div className="flex h-[100vh] flex-col items-center gap-0 p-1 pb-2">
      <div className="mb-2 flex h-full w-full flex-col gap-2 rounded-md bg-[#e8e8e8] p-1">
        <div className="flex w-full items-center justify-around rounded-[5px_5px_5px_5px] bg-[#e8e8e8] py-3 text-white shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
          <img
            className="h-16 rounded-[50%]"
            src={auth.currentUser.photoURL}
            alt=""
          />
          <div className="">
            <h3 className="text-md font-semibold">
              {auth.currentUser.displayName}
            </h3>
          </div>
        </div>
      </div>
      <AccountDelete deleteAccount={deleteAccount} />
    </div>
  );
}
