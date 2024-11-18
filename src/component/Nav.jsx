import home from "../images/Home.png";
import Shiv from "../images/Vihar.png";
import van from "../images/Vehicle.gif";
import { auth } from "../firebaseConfig";
import { NavLink } from "react-router-dom";
import profile from "../images/Profile.png";
import { useEffect } from "react";

export default function Nav() {
  return (
    <div
      className={`h-24 w-full rounded-[5px] bg-transparent flex items-center justify-around shadow-[1px_1px_8px_#4d1601]`}
    >
      <div className="flex items-center justify-center border-white sm:w-[20%]">
        <img
          className="rounded-lg drop-shadow-[1px_1px_2px_#ffffff] sm:w-12 md:h-24 lg:h-28"
          src={Shiv}
          alt=""
        />
      </div>

      <div className="flex items-center rounded-md bg-transparent shadow-[1px_1px_4px_#fde4c3] sm:h-10 sm:w-[45%] md:h-8 md:w-64 lg:h-10">
        <input
          className="h-full bg-transparent font-normal text-white duration-1000 ease-in-out placeholder:text-white sm:w-full sm:rounded-sm sm:pl-3 sm:text-lg sm:placeholder:text-[17px] sm:placeholder:font-light md:pl-2 md:text-xl md:placeholder:text-lg lg:pl-2 lg:text-xl lg:placeholder:text-lg"
          type="text"
          placeholder="Search here"
        />
      </div>
      <div></div>
      <div
        className={`flex items-center justify-evenly border-red-500 font-semibold sm:h-full sm:w-[32%] sm:gap-1 sm:p-0 md:w-72 md:gap-5 md:text-[10px] lg:max-w-max lg:gap-8 lg:p-2 lg:pr-8 lg:text-[18px]`}
      >
        <div className="border-blue-500">
          <NavLink to="/">
            <img className="h-8" src={home} alt="" />
          </NavLink>
        </div>
        <div className="border-blue-500">
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive ? "cursor-pointer text-orange-500" : "cursor-pointer"
            }>
            <img className="h-8 self-baseline" src={van} alt="" />
          </NavLink>
        </div>
      </div>
    </div >
  );
}