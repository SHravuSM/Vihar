import React from "react";
import LoginComponent from "./LoginComponent";
import { auth } from "../firebaseConfig";
import Nav from "./Nav";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center gap-1 bg-[url('../src/images/Hampi7.png')] bg-cover bg-center pb-2 pt-1">
      {!auth.currentUser?.displayName && <Nav white={true} />}
      <div className="h-full w-full"></div>
      <LoginComponent />
    </div>
  );
}

{
  /* <Nav /> */
}
{
  /* <h1 className='text-2xl font-semibold font-mono text-blue-600'>This is Home Page</h1> */
}
{
  /* <VehiclesList /> */
}
{
  /* <NavLink className=' border-2 border-blue-500 p-2 font-bold text-xl rounded-md ' to='/login'>Log In</NavLink> */
}
