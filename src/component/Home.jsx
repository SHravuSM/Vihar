// import Nav from "./Nav";
// import JoinUsBtn from "./JoinUsBtn";
// import GetStarted from "./GetStarted";
// import { NavLink, useNavigate } from "react-router-dom";
// import HAMPI from '../images/Hampi2.png'
// import HOTEL from '../images/Restaurant.gif'
// import BIKE from "../images/Bike.gif";
// import LoginComponent from "./LoginComponent"
// import CONTACTUS from '../images/Contact-Us.png';;

// export default function Home() {
//   const Navigate = useNavigate()
//   return (
//     //  bg-gradient-to-b from-pink-300 via-violet-500 to-red-300
//     <div
//       className={`flex h-screen flex-col items-center bg-right gap-1 bg-cover p-1 pt-0 text-white`}
//       style={{
//         backgroundImage: `url(${HAMPI})`,
//         // backgroundSize: 'cover', // Ensures the image covers the entire div
//         // backgroundPosition: 'center', // Centers the image
//         backgroundRepeat: 'no-repeat', // Prevents tiling
//       }}
//     >

//       {/* Navigation */}
//       <Nav />

//       {/* Main Content */}
//       <div className="flex w-full flex-1 items-center justify-center px-8">
//         {/* <div className="flex flex-col items-center gap-6 text-center bg-black/10 backdrop-blur-sm p-8 border-[1px] border-white/20 rounded-lg shadow-2xl"> */}
//         <div
//           className="flex max-h-max flex-col items-center gap-6 rounded-lg border-white/20 bg-black/10 p-3 text-center shadow-2xl backdrop-blur-sm"
//           style={{
//             backdropFilter: "blur(2px)", // Frosted-glass blur effect
//             background: "rgba(255, 255, 255, 0.1)", // Increased transparency (even more subtle)
//             border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for definition
//           }}
//         >

//           <h1 className="text-4xl font-light leading-snug tracking-wider drop-shadow-md">
//             Explore Your Journey with{" "}
//             <span className="text-6xl font-normal text-yellow-500">V!HAR</span>
//           </h1>

//           <div>
//             <div className="text-[16px] pr-3 gap-4 flex items-center justify-between pl-3 bg-white rounded-lg max-w-max max-h-min  font-normal underline leading-relaxed text-green-400 tracking-wider">

//               <img
//                 onClick={() => Navigate('/vehicles')}
//                 className="h-14 transform transition-transform z-10 duration-300 hover:scale-110"
//                 src={BIKE}
//                 alt="Vehicles"
//               />

//               <img
//                 className="h-12 transform transition-transform duration-300 hover:scale-110"
//                 src={HOTEL}
//                 alt="Vehicles"
//               />
//             </div>

//             <h1>Bookings Simplified</h1>
//           </div>

//           <p className="text-lg font-light text-white">Enjoy on your journey — we’ll make booking the easy part.</p>

//         </div>
//       </div>

//       {/* Footer Section */}
//       <div className="flex w-full flex-col items-center gap-2 px-2 pt-8 pb-1">
//         <GetStarted />
//         <div className="flex w-full items-center justify-center gap-5">
//           <NavLink to="/join-us">
//             <JoinUsBtn />
//           </NavLink>
//           <span className="text-xl font-semibold tracking-wide text-gray-200">
//             OR
//           </span>
//           <LoginComponent />
//         </div>
//       </div>
//     </div>
//   );
// }

import Nav from "./Nav";
import JoinUsBtn from "./JoinUsBtn";
import GetStarted from "./GetStarted";
import { NavLink, useNavigate } from "react-router-dom";
import HAMPI from '../images/Hampi2.png';
import HOTEL from '../images/Restaurant.gif';
import BIKE from "../images/Bike.gif";
import LoginComponent from "./LoginComponent";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-screen flex-col items-center gap-1 bg-cover bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${HAMPI})`,
        backgroundPosition: "center",
      }}
    >
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <div className="flex flex-1 w-full items-center justify-center px-8">
        <div
          className="flex max-h-max flex-col items-center gap-6 rounded-lg bg-black/30 p-6 text-center shadow-2xl"
          style={{
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h1 className="text-4xl font-light leading-snug tracking-wide drop-shadow-lg">
            Explore Your Journey with
            <span className="block text-6xl font-thin not-italic text-yellow-500 mt-2">
              V!HAR
            </span>
          </h1>

          <div className="flex items-center gap-0 bg-white/20 pr-1 pl-2 rounded-lg shadow-lg">
            <img
              onClick={() => navigate('/vehicles')}
              className="h-16 cursor-pointer transition-transform duration-300 hover:scale-110"
              src={BIKE}
              alt="Vehicles"
            />
            <hr className="w-8 border text-black rounded-lg rotate-90" />
            <img
              className="h-14 transition-transform duration-300 hover:scale-110"
              src={HOTEL}
              alt="Hotel"
            />
          </div>

          <p className="text-lg font-light text-gray-300">
            Enjoy your journey — we’ll make booking the easy part.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex w-full flex-col items-center gap-4 px-4 pt-8 pb-4">
        <GetStarted />

        <div className="flex items-center gap-4">
          <NavLink to="/join-us">
            <JoinUsBtn />
          </NavLink>
          <span className="text-xl font-semibold tracking-wide text-gray-300">
            OR
          </span>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}