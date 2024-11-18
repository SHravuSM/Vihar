// ProviderDashboard.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  reauthenticateWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import ProviderVehicles from "./ProviderVehicles";
import Radio from "./Radio";
import Logoff from "./Logoff";
import Add from "./Add";
import Renewal from "./Renewal";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    location: "",
    price: "",
    imageUrl: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [userRole, setUserRole] = useState(null); // To store the role of the current user
  const vehiclesCollectionRef = collection(db, "vehicles");
  const [type, setType] = useState("Bike");

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role); // Assuming role is stored in Firestore under 'users' collection
        }
      }
    };
    checkUserRole();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getDocs(vehiclesCollectionRef);
      setVehicles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchVehicles();
  }, []);

  const handleImageUpload = async () => {
    if (!imageUpload) return null;
    const imageRef = ref(storage, `images/${imageUpload.name}-${Date.now()}`);
    await uploadBytes(imageRef, imageUpload);
    return await getDownloadURL(imageRef);
  };

  const logout = async () => {
    setTimeout(() => {
      try {
        signOut(auth).then(() => (window.location.href = "/")); // Redirects to login page
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }, 200);
  };

  return (
    <div className="relative flex max-h-full w-full flex-col items-center gap-2 p-2">
      <div className="relative flex w-full flex-col items-center">
        <NavLink className="w-full" to="/provider/account">
          <div className="mb-2 flex w-full flex-col gap-2 rounded-md">
            <div className="flex w-full items-center justify-around rounded-lg border border-[#e8e8e8] bg-white py-3 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
              <img
                className="h-16 rounded-[50%] border-2"
                src={auth.currentUser.photoURL}
                alt=""
              />
              <div className="">
                <h3 className="text-md font-semibold">
                  {auth.currentUser.displayName}
                </h3>
              </div>
            </div>
          </div>
        </NavLink>
        <div className="flex w-full flex-col items-center gap-2 px-4 py-2">
          <h2 className="mb-1 text-center text-2xl font-semibold">
            Your Vehicle Listings
          </h2>
          <div className="flex items-center gap-2">
            <div
              onClick={() =>
                setTimeout(() => navigate("/provider/add-vehicle"), 400)
              }
            >
              <Add />
            </div>
            {/* <NavLink to="/provider/account">
              <Renew />
            </NavLink> */}
            <div
              onClick={() =>
                setTimeout(() => navigate("/provider/account"), 400)
              }
            >
              <Renewal />
            </div>
          </div>

          {/* <div className='border-2 flex items-center text-lg justify-around rounded-[20px] shadow-md w-full h-10 '> */}
          {/* <button onClick={()=>setType('Bike')} className='px-2 text-blue-500 active:bg-blue-500 drop-shadow-lg'>Bikes</button>
          <button onClick={()=>setType('Scooter')} className='px-2 text-pink-500 active:bg-blue-500 drop-shadow-lg'>Scooters</button>
          <button onClick={()=>setType('Car')} className='px-2 text-slate-500 active:bg-blue-500 drop-shadow-lg'>Cars</button> */}

          <Radio type={type} setType={setType} />
          {/* 
        </div > */}

          <div className="barbar w-full overflow-y-scroll rounded-md shadow-xl">
            <ProviderVehicles type={type} />
          </div>
        </div>
      </div>

      <div className="text-center">
        {/* <Logoff logout={logout} /> */}
        {/* Conditionally render Delete Account button based on role */}
        <Logoff logout={logout} />
      </div>
    </div>
  );
};

export default ProviderDashboard;
