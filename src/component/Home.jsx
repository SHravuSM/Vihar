import React from "react";
import LoginComponent from "./LoginComponent";
import { auth } from "../firebaseConfig";
import Nav from "./Nav";
import SwipeToCallButton from "./SwipeToCallButton";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center gap-1 bg-[url('../src/images/Hampi7.png')] bg-cover bg-center pb-2 pt-1">
      {!auth.currentUser?.displayName && <Nav white={true} />}
      <div className="h-full w-full"></div>
      <SwipeToCallButton phoneNumber={7411361004} />
      <LoginComponent />
    </div>
  );
}