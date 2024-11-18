import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Shiv from "../images/Vihar.png";
import profile from "../images/Profile.png";
import van from "../images/Vehicle.gif";
import home from "../images/Home.png";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebaseConfig";

export default function Nav({ white }) {
  const { user } = useAuth();
  const [yes, No] = useState();

  useEffect(() => {
    No(white);
  }, [white]);

  return (
    <div className={`w-full lg:h-32 ${!yes ? "bg-gradient-to-r from-blue-400 via-red-200 to pink-400" : "bg-transparent"}  flex items-center justify-evenly sm:h-32 md:h-24 md:p-2 lg:p-2`}>

      <div className="flex items-center justify-center sm:w-[20%] border-white">
        <img className="sm:w-12 md:h-24 lg:h-28 drop-shadow-[1px_1px_5px_#ffffff]" src={Shiv} alt="" />
      </div>

      <div className='flex bg-none lg:h-10 md:h-8 sm:h-10 border-2 sm:w-[45%] md:w-64 rounded-md items-center '>
        <input className='sm:w-full rounded-md bg-none bg-transparent duration-1000 ease-in-out h-full lg:pl-2 md:pl-2 sm:pl-3 lg:text-xl md:text-xl sm:text-sm text-white placeholder:text-white lg:placeholder:text-lg md:placeholder:text-lg sm:placeholder:text-[17px] sm:rounded-sm' type="text" placeholder='Search here' />
      </div>
      <div>

      </div>
      <div
        className={`flex font-semibold sm:w-[32%] sm:h-full items-center justify-evenly sm:pl-1 border-red-500 md:w-72 md:text-[10px] lg:max-w-max lg:pr-8 lg:text-[18px] sm:gap-1 sm:p-0 md:gap-5 lg:gap-8 lg:p-2`}>
        <div className=" h-full pt-6">
          <NavLink to="/">
            <img className="h-10" src={home} alt="" />
          </NavLink>
        </div>
        <div className="h-full pt-8">
          {!auth?.currentUser ?
            <NavLink
              to="/vehicles"
              className={({ isActive }) =>
                isActive ? "cursor-pointer  text-orange-500" : "cursor-pointer"
              }
            >
              <img className="h-10 self-baseline " src={van} alt="" />
            </NavLink> : <NavLink
              to="/provider"
              className={({ isActive }) =>
                isActive ? "cursor-pointer  text-orange-500" : "cursor-pointer"
              }
            >
              <img
                className="sm:h-10 lg:h-14 lg:w-14"
                src={profile}
                alt="Profile"
              />
            </NavLink>}
        </div>
      </div>

    </div>
    // </div>
  );
}
