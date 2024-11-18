import Nav from "./Nav";
import JoinUsBtn from "./JoinUsBtn";
import GetStarted from "./GetStarted";
import { NavLink } from "react-router-dom";
import LoginComponent from "./LoginComponent";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center bg-[url('../src/images/Hampi7.png')] bg-cover bg-center p-1">
      <Nav />
      <div className="h-full w-full"></div>
      <div className="flex w-full flex-col items-center justify-around gap-2 p-2 pb-1">
        <GetStarted />
        <div className="flex w-full items-center justify-between">
          <NavLink to="/join-us">
            <JoinUsBtn />
          </NavLink>
          <p className="text-white">then</p>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}
