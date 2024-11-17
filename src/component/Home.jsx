import React from "react";
import LoginComponent from "./LoginComponent";
import { auth } from "../firebaseConfig";
import Nav from "./Nav";
import SwipeToCallButton from "./SwipeToCallButton";
import { NavLink } from "react-router-dom";
import JoinUsBtn from './JoinUsBtn';
import GetStarted from "./GetStarted";

export default function Home() {

  return (
    <div className="flex h-screen flex-col items-center bg-[url('../src/images/Hampi7.png')] bg-cover bg-center ">
      <Nav white={true} />
      <div className="h-full w-full ">

      </div>
      <SwipeToCallButton phoneNumber={9481526572} />
      <div className="flex w-full bg-gradient-to-b from-transparent to-black flex-col justify-around p-2 gap-1">
        <GetStarted />
        <div className="flex items-center justify-between ">
          <NavLink to="/join-us">
            <JoinUsBtn />
          </NavLink>
          <p className="text-white">or</p>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}
