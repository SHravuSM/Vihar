import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Shiv from "../images/Shiv.png";
import profile from "../images/Profile.png";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebaseConfig";
import Input from "./Input";

export default function Nav({ white }) {
  const { user } = useAuth();
  const [yes, No] = useState();

  useEffect(() => {
    No(white);
  }, [white]);

  return (
    <div
      className={`w-full lg:h-32 ${!yes ? "bg-white" : "bg-transparent"} flex items-center justify-around sm:h-20 md:h-24 md:p-2 lg:p-2`}
    >
      <div className="flex items-center justify-center sm:h-16 sm:w-[15%]">
        <img className="sm:h-14 md:h-24 lg:h-28" src={Shiv} alt="" />
      </div>

      <div className="flex items-center sm:w-[84%] sm:justify-evenly lg:gap-80">
        <Input />
        <div
          className={`flex font-semibold sm:h-10 sm:justify-center sm:text-[14px] md:w-72 md:text-[10px] lg:max-w-max lg:pr-8 lg:text-[18px] ${!yes ? "text-black" : "text-white"} items-center sm:w-32 sm:gap-3 md:gap-5 lg:gap-8 lg:p-2`}
        >
          <NavLink to="/">Home</NavLink>
          {!auth?.currentUser && (
            <NavLink
              to="/vehicles"
              className={({ isActive }) =>
                isActive ? "cursor-pointer text-orange-500" : "cursor-pointer"
              }
            >
              Vehicles
            </NavLink>
          )}
          {user != null && (
            <NavLink
              to="/provider"
              className={({ isActive }) =>
                isActive ? "cursor-pointer text-orange-500" : "cursor-pointer"
              }
            >
              <img
                className="sm:h-10 lg:h-14 lg:w-14"
                src={profile}
                alt="Profile"
              />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
