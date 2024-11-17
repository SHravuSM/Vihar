import React from "react";
import LoginComponent from "./LoginComponent";
import { auth } from "../firebaseConfig";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";
import JoinUsBtn from "./JoinUsBtn";
import GetStarted from "./GetStarted";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center bg-[url('../src/images/Hampi7.png')] bg-cover bg-center">
      <Nav white={true} />
      <div className="h-full w-full"></div>
      {!auth.currentUser && (
        <div className="flex w-full flex-col items-center justify-around gap-2 border bg-gradient-to-b from-transparent to-black p-2">
          <GetStarted />
          <div className="flex w-full items-center justify-around">
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
