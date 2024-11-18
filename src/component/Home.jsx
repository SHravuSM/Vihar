import React, { useEffect, useState } from "react";
import LoginComponent from "./LoginComponent";
import { auth } from "../firebaseConfig";
import Nav from "./Nav";
import { NavLink, useNavigate } from "react-router-dom";
import JoinUsBtn from "./JoinUsBtn";
import GetStarted from "./GetStarted";
import { doc, getDoc } from "firebase/firestore";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      if (userData?.role === "vehicle provider") {
        setIsAdmin(true);
      } else {
        navigate("/"); // Redirect to home if not admin
      }
    };
  }, [])
  return (
    <div className="flex h-screen flex-col items-center p-1 bg-[url('../src/images/Hampi7.png')] bg-cover bg-center">
      <Nav white={true} />
      <div className="h-full w-full"></div>
      {!isAdmin && (
        <div className="flex w-full flex-col items-center justify-around gap-2 p-2  pb-1">
          <GetStarted />
          <div className="flex w-full items-center justify-between">
            <NavLink to="/join-us">
              <JoinUsBtn />
            </NavLink>
            <p className="text-white">then</p>
            <LoginComponent />
          </div>
        </div>
      )}
    </div>
  );
}

