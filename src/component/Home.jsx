// import Nav from "./Nav";
// import JoinUsBtn from "./JoinUsBtn";
// import GetStarted from "./GetStarted";
// import { NavLink } from "react-router-dom";
// import LoginComponent from "./LoginComponent";

// export default function Home() {
//   return (
//     <div className="flex h-screen flex-col items-center bg-[url('../src/images/Hampi7.png')] bg-cover bg-center p-1">
//       <Nav />
//       <div className="h-full w-full"></div>
//       <div className="flex w-full flex-col items-center justify-around gap-2 p-2 pb-1">
//         <GetStarted />
//         <div className="flex w-full items-center justify-between">
//           <NavLink to="/join-us">
//             <JoinUsBtn />
//           </NavLink>
//           <p className="text-white">then</p>
//           <LoginComponent />
//         </div>
//       </div>
//     </div>
//   );
// }

import Nav from "./Nav";
import JoinUsBtn from "./JoinUsBtn";
import GetStarted from "./GetStarted";
import { NavLink } from "react-router-dom";
import HAMPI from '../images/Hampi2.png'
import LoginComponent from "./LoginComponent";

export default function Home() {
  return (
    //  bg-gradient-to-b from-pink-300 via-violet-500 to-red-300
    <div
      className={`flex h-screen flex-col items-center bg-right gap-1 bg-cover p-1 pt-0 text-white`}
      style={{
        backgroundImage: `url(${HAMPI})`,
        // backgroundSize: 'cover', // Ensures the image covers the entire div
        // backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents tiling
      }}
    >

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <div className="flex w-full flex-1 items-center justify-center px-8">
        {/* <div className="flex flex-col items-center gap-6 text-center bg-black/10 backdrop-blur-sm p-8 border-[1px] border-white/20 rounded-lg shadow-2xl"> */}
        <div
          className="flex max-h-max flex-col items-center gap-6 rounded-lg border-white/20 bg-black/10 p-3 text-center shadow-2xl backdrop-blur-sm"
          style={{
            backdropFilter: "blur(2px)", // Frosted-glass blur effect
            background: "rgba(255, 255, 255, 0.1)", // Increased transparency (even more subtle)
            border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for definition
          }}
        >
          <h1 className="text-4xl font-light leading-snug tracking-wider drop-shadow-md">
            Explore Your Journey with{" "}
            <span className="text-6xl font-normal text-yellow-500">V!HAR</span>
          </h1>
          <NavLink to="/vehicles" className="text-[16px] font-normal underline leading-relaxed text-blue-400">
            Booking Vehicles is simple.
          </NavLink>
          <p className="text-lg font-light text-white">Enjoy on your journey — we’ll make booking the easy part.</p>

        </div>
      </div>

      {/* Footer Section */}
      <div className="flex w-full flex-col items-center gap-1 px-2 pt-8 pb-4">
        <div className="flex w-full items-center justify-center gap-5">
          <NavLink to="/join-us">
            <JoinUsBtn />
          </NavLink>
          <span className="text-xl font-semibold tracking-wide text-gray-200">
            OR
          </span>
          <LoginComponent />
        </div>
        <GetStarted />
      </div>
    </div>
  );
}
