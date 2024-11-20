// import home from "../images/Home.png";
// import Shiv from "../images/Vihar.png";
// import van from "../images/Vehicle.gif";
// import { auth } from "../firebaseConfig";
// import { NavLink } from "react-router-dom";
// import profile from "../images/Profile.png";
// import { useEffect } from "react";

// export default function Nav() {
//   return (
//     <div
//       className={`h-24 w-full rounded-[5px] bg-transparent flex items-center justify-around shadow-[1px_1px_8px_#4d1601]`}
//     >
//       <div className="flex items-center justify-center border-white sm:w-[20%]">
//         <img
//           className="rounded-lg drop-shadow-[1px_1px_2px_#ffffff] sm:w-12 md:h-24 lg:h-28"
//           src={Shiv}
//           alt=""
//         />
//       </div>

//       <div className="flex items-center rounded-md bg-transparent shadow-[1px_1px_4px_#fde4c3] sm:h-10 sm:w-[45%] md:h-8 md:w-64 lg:h-10">
//         <input
//           className="h-full bg-transparent font-normal text-white duration-1000 ease-in-out placeholder:text-white sm:w-full sm:rounded-sm sm:pl-3 sm:text-lg sm:placeholder:text-[17px] sm:placeholder:font-light md:pl-2 md:text-xl md:placeholder:text-lg lg:pl-2 lg:text-xl lg:placeholder:text-lg"
//           type="text"
//           placeholder="Search here"
//         />
//       </div>
//       <div></div>
//       <div
//         className={`flex items-center justify-evenly border-red-500 font-semibold sm:h-full sm:w-[32%] sm:gap-1 sm:p-0 md:w-72 md:gap-5 md:text-[10px] lg:max-w-max lg:gap-8 lg:p-2 lg:pr-8 lg:text-[18px]`}
//       >
//         <div className="border-blue-500">
//           <NavLink to="/">
//             <img className="h-8" src={home} alt="" />
//           </NavLink>
//         </div>
//         <div className="border-blue-500">
//           <NavLink
//             to="/vehicles"
//             className={({ isActive }) =>
//               isActive ? "cursor-pointer text-orange-500" : "cursor-pointer"
//             }>
//             <img className="h-8 self-baseline" src={van} alt="" />
//           </NavLink>
//         </div>
//       </div>
//     </div >
//   );
// }

// import React from "react";
// import home from "../images/Home.png";
// import Shiv from "../images/Vihar.png";
// import van from "../images/Vehicle.gif";
// import { NavLink } from "react-router-dom";

// export default function Nav() {
//   return (
//     <div
//       className="flex h-24 w-full items-center justify-around rounded-md bg-transparent shadow-lg"
//       style={{
//         backdropFilter: "blur(1px)",
//         background: "rgba(0, 0, 0, 0.1)", // Subtle translucent effect
//       }}
//     >
//       {/* Logo Section */}
//       <div className="flex items-center">
//         <img
//           className="h-12 rounded-lg shadow-md sm:w-12 md:h-20 lg:h-24"
//           src={Shiv}
//           alt="Logo"
//         />
//       </div>

//       {/* Search Bar */}
//       <div className="relative flex h-10 w-1/3 items-center rounded-lg bg-gray-800 shadow-inner sm:w-1/2 md:h-12 md:w-[45%]">
//         <input
//           className="w-full rounded-l-lg bg-transparent px-4 text-white placeholder-gray-300 focus:outline-none sm:text-sm md:text-base"
//           type="text"
//           placeholder="Search here"
//         />
//       </div>

//       {/* Navigation Links */}
//       <div className="flex items-center gap-6 text-sm font-semibold text-white md:gap-8 lg:text-lg">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive
//               ? "text-orange-400"
//               : "hover:text-orange-400 transition-colors duration-300"
//           }
//         >
//           <img
//             className="h-8 hover:scale-110 transform transition-transform duration-300"
//             src={home}
//             alt="Home"
//           />
//         </NavLink>
//         <NavLink
//           to="/vehicles"
//           className={({ isActive }) =>
//             isActive
//               ? "text-orange-400"
//               : "hover:text-orange-400 transition-colors duration-300"
//           }
//         >
//           <img
//             className="h-8 hover:scale-110 transform transition-transform duration-300"
//             src={van}
//             alt="Vehicles"
//           />
//         </NavLink>

//       </div>
//     </div>
//   );
// }
import React from "react";
import home from "../images/Home.png";
import Shiv from "../images/Vihar.png";
import van from "../images/Vehicle.gif";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div
      className="flex h-24 w-full items-center justify-around rounded-lg border-[1px] border-white/20 bg-black/10 shadow-2xl backdrop-blur-[2px]"
      // style={{
      //   backdropFilter: "blur(2px)", // Frosted-glass blur effect
      //   background: "rgba(255, 255, 255, 0.1)", // Increased transparency (even more subtle)
      //   border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for definition
      // }}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          className="h-12 rounded-lg shadow-md transition-transform duration-300 hover:scale-110 sm:w-12 md:h-20 lg:h-24"
          src={Shiv}
          alt="Logo"
        />
      </div>

      {/* Search Bar with Floating Effect */}
      <div className="shadow-[inset_-4px_-4px_6px_rgba(233, 225, 225, 1),inset_4px_4px_6px_rgba(252, 245, 245, 1)] relative flex h-12 w-1/3 items-center rounded-md border-[1px] border-white/20 bg-black/10 shadow-2xl sm:mr-1 backdrop-blur-sm sm:w-1/2 md:h-14 md:w-[45%]">
        <input
          className="h-full w-full rounded-md border-red-300 bg-transparent px-4 text-red-300 placeholder-white focus:border focus:outline-none focus:ring-transparent focus:ring-offset-2 focus:placeholder:text-red-300 sm:text-sm md:text-base"
          type="text"
          placeholder="Search here"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-5 text-sm font-semibold text-white lg:text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-orange-400"
              : "transition-colors duration-300 hover:text-orange-400"
          }
        >
          <img
            className="h-10 transform transition-transform duration-300 hover:scale-110"
            src={home}
            alt="Home"
          />
        </NavLink>
        <NavLink
          to="/vehicles"
          className={({ isActive }) =>
            isActive
              ? "text-orange-400"
              : "transition-colors duration-300 hover:text-orange-400"
          }
        >
          <img
            className="h-10 transform transition-transform duration-300 hover:scale-110"
            src={van}
            alt="Vehicles"
          />
        </NavLink>
      </div>
    </div>
  );
}
