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
    <div className="flex h-screen flex-col p-1 items-center bg-[url('../src/images/Hampi7.png')] bg-cover bg-center text-white">
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <div className="flex flex-1 w-full items-center justify-center px-4">
        <div className="flex flex-col items-center gap-6 text-center bg-black/50 backdrop-blur-md p-8 border-[1px] border-white/20 rounded-lg shadow-2xl">
          <h1 className="text-5xl font-extrabold tracking-wider leading-snug drop-shadow-md">
            Explore Your Journey with{" "}
            <span className="text-yellow-400">Vihar</span>
          </h1>
          <p className="text-xl font-light leading-relaxed text-gray-300">
            Your trusted partner for renting vehicles, anytime, anywhere.
          </p>
          <GetStarted />
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex w-full flex-col items-center gap-6 px-6 py-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent shadow-inner">
        <div className="flex w-full items-center justify-center gap-6">
          <NavLink to="/join-us">
            <JoinUsBtn />
          </NavLink>
          <span className="text-lg font-medium tracking-wider text-gray-300">
            OR
          </span>
          <LoginComponent />
        </div>
        <p className="text-sm font-light text-gray-400 text-center leading-relaxed">
          Experience hassle-free bookings and access the best vehicle options
          tailored to your needs.
        </p>
      </div>
    </div>
  );
}
