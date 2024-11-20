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
import LoginComponent from "./LoginComponent";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center gap-1 bg-[url('../src/images/Hampi7.png')] bg-cover bg-center p-1 text-white">
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <div className="flex w-full flex-1 items-center justify-center px-8">
        {/* <div className="flex flex-col items-center gap-6 text-center bg-black/10 backdrop-blur-sm p-8 border-[1px] border-white/20 rounded-lg shadow-2xl"> */}
        <div
          className="flex max-h-max flex-col items-center gap-6 rounded-lg border-white/20 bg-black/10 p-1 text-center shadow-2xl backdrop-blur-sm"
          style={{
            backdropFilter: "blur(2px)", // Frosted-glass blur effect
            background: "rgba(255, 255, 255, 0.1)", // Increased transparency (even more subtle)
            border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for definition
          }}
        >
          <h1 className="text-4xl font-light leading-snug tracking-wider drop-shadow-md">
            Explore Your Journey with{" "}
            <span className="text-6xl font-normal text-yellow-500">Vihar</span>
          </h1>
          <p className="text-xl font-normal leading-relaxed text-gray-300">
            Your trusted partner for renting vehicles, anytime, anywhere.
          </p>
          <GetStarted />
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex w-full flex-col items-center gap-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2 py-8 shadow-lg">
        <div className="flex w-full items-center justify-center gap-5">
          <NavLink to="/join-us">
            <JoinUsBtn />
          </NavLink>
          <span className="text-xl font-semibold tracking-wide text-gray-200">
            OR
          </span>
          <LoginComponent />
        </div>
        <p className="max-w-xl text-center text-base font-light leading-relaxed text-gray-300">
          Discover a seamless experience with hassle-free bookings and a curated
          selection of the best vehicle options, tailored just for you.
        </p>
      </div>
    </div>
  );
}
