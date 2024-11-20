// // ProviderDashboard.js
// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   getDocs,
//   getDoc,
//   arrayUnion,
// } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import { NavLink, useNavigate } from "react-router-dom";
// import ProviderVehicles from "./ProviderVehicles";
// import Radio from "./Radio";
// import Logoff from "./Logoff";
// import Add from "./Add";
// import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
// import Renewal from "./Renewal";
// import Base64ImageUpload from './Base64ImageUpload';

// const ProviderDashboard = () => {
//   const navigate = useNavigate();
//   const [vehicles, setVehicles] = useState([]);
//   const [newVehicle, setNewVehicle] = useState({
//     name: "",
//     type: "",
//     location: "",
//     price: "",
//     imageUrl: "",
//   });
//   const [imageUpload, setImageUpload] = useState(null);
//   const [userRole, setUserRole] = useState(null); // To store the role of the current user
//   const vehiclesCollectionRef = collection(db, "vehicles");
//   const [type, setType] = useState("Bike");

//   useEffect(() => {
//     const checkUserRole = async () => {
//       const user = auth.currentUser;

//       if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists()) {
//           setUserRole(userDoc.data().role); // Assuming role is stored in Firestore under 'users' collection
//         }
//       }
//     };
//     checkUserRole();
//   }, []);

//   const handleRenewal = async () => {
//     try {
//       const user = auth.currentUser;

//       if (user) {
//         const userDocRef = doc(db, "users", user.uid);
//         let date = new Date();
//         // Assuming payment has been processed successfully via some gateway
//         const paymentDetails = {
//           transactionId: "txn_123456", // Example: Replace with actual transaction ID from payment gateway
//           amount: 100, // Example: Replace with actual amount paid
//           Date: date.toISOString()

//         };

//         // Update payment details
//         await updateDoc(userDocRef, {
//           isPaid: true, // Mark as paid
//           paymentDetails: paymentDetails, // Store payment details like transaction ID
//           paymentDate: serverTimestamp(), // Store the current timestamp
//           paymentHistory: arrayUnion(paymentDetails),
//         });

//         alert(
//           "Payment successful! Your vehicles are now visible for the next 24 hours.",
//         );
//       }
//     } catch (error) {
//       console.error("Error updating payment status:", error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       const data = await getDocs(vehiclesCollectionRef);
//       setVehicles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
//     fetchVehicles();
//   }, []);

//   const handleImageUpload = async () => {
//     if (!imageUpload) return null;
//     const imageRef = ref(storage, `images/${imageUpload.name}-${Date.now()}`);
//     await uploadBytes(imageRef, imageUpload);
//     return await getDownloadURL(imageRef);
//   };

//   const logout = async () => {
//     setTimeout(() => {
//       try {
//         signOut(auth).then(() => (window.location.href = "/")); // Redirects to login page
//       } catch (error) {
//         console.error("Logout Error:", error);
//       }
//     }, 200);
//   };

//   return (
//     <div className="relative flex max-h-full w-full flex-col items-center gap-2 p-2">
//       <div className="relative flex w-full flex-col items-center">
//         <div className="w-full" >
//           <div className="mb-2 flex w-full flex-col gap-2 rounded-md">
//             <div className="flex w-full items-center justify-evenly rounded-lg border border-[#e8e8e8] bg-white py-3 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
//               {/* <img
//                 className="h-16 rounded-[50%] border-2"
//                 src={auth.currentUser.photoURL}
//                 alt=""
//               /> */}
//               <Base64ImageUpload />
//               <div className="">
//                 <h3 className="text-md font-semibold">
//                   {auth.currentUser.displayName}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex w-full flex-col items-center gap-2 px-4 py-2">
//           <h2 className="mb-1 text-center text-2xl font-semibold">
//             Your Vehicle Listings
//           </h2>
//           <div className="flex items-center gap-2">
//             <div
//               onClick={() =>
//                 setTimeout(() => navigate("/provider/add-vehicle"), 400)
//               }
//             >
//               <Add />
//             </div>
//             {/* <NavLink to="/provider/account">
//               <Renew />
//             </NavLink> */}
//             <button className="renew" onClick={handleRenewal}>
//               {/* // onClick={() => setTimeout(() => navigate("/provider/account"), 400)} */}
//               <Renewal />
//             </button>
//           </div>

//           {/* <div className='border-2 flex items-center text-lg justify-around rounded-[20px] shadow-md w-full h-10 '> */}
//           {/* <button onClick={()=>setType('Bike')} className='px-2 text-blue-500 active:bg-blue-500 drop-shadow-lg'>Bikes</button>
//           <button onClick={()=>setType('Scooter')} className='px-2 text-pink-500 active:bg-blue-500 drop-shadow-lg'>Scooters</button>
//           <button onClick={()=>setType('Car')} className='px-2 text-slate-500 active:bg-blue-500 drop-shadow-lg'>Cars</button> */}

//           <Radio type={type} setType={setType} />
//           {/* 
//         </div > */}

//           <div className="barbar w-full overflow-y-scroll rounded-md shadow-xl">
//             <ProviderVehicles type={type} />
//           </div>
//         </div>
//       </div>

//       <div className="text-center">
//         {/* <Logoff logout={logout} /> */}
//         {/* Conditionally render Delete Account button based on role */}
//         <Logoff logout={logout} />
//       </div>
//     </div>
//   );
// };

// export default ProviderDashboard;








import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  arrayUnion,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import ProviderVehicles from "./ProviderVehicles";
import Radio from "./Radio";
import Logoff from "./Logoff";
import Add from "./Add";
import Renewal from "./Renewal";
import Base64ImageUpload from "./Base64ImageUpload";

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
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false); // Subscription status
  const [timeRemaining, setTimeRemaining] = useState(""); // Remaining time as string

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

    const checkSubscriptionStatus = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Check if the subscription is active
          if (userData.isPaid && userData.paymentDate) {
            const paymentTimestamp = userData.paymentDate.seconds * 1000; // Convert Firestore timestamp to milliseconds
            const currentTime = Date.now();
            const timeLeft = paymentTimestamp + 24 * 60 * 60 * 1000 - currentTime;

            if (timeLeft > 0) {
              setIsSubscriptionActive(true);
              updateTimeRemaining(timeLeft);
            } else {
              setIsSubscriptionActive(false); // Subscription expired
              setTimeRemaining("");
            }
          } else {
            setIsSubscriptionActive(false); // Not paid or no payment date
            setTimeRemaining("");
          }
        }
      }
    };

    const updateTimeRemaining = (timeLeft) => {
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      setTimeRemaining(`${hours} hours, ${minutes} minutes left`);
    };

    const startCountdown = () => {
      const interval = setInterval(() => {
        checkSubscriptionStatus();
      }, 60000); // Update every minute
      return () => clearInterval(interval); // Cleanup on component unmount
    };

    checkUserRole();
    checkSubscriptionStatus();
    const intervalCleanup = startCountdown();

    return intervalCleanup;
  }, []);

  const handleRenewal = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        let date = new Date();

        const paymentDetails = {
          transactionId: "txn_123456", // Example: Replace with actual transaction ID from payment gateway
          amount: 100, // Example: Replace with actual amount paid
          Date: date.toISOString(),
        };

        // Update payment details
        await updateDoc(userDocRef, {
          isPaid: true, // Mark as paid
          paymentDetails: paymentDetails, // Store payment details like transaction ID
          paymentDate: serverTimestamp(), // Store the current timestamp
          paymentHistory: arrayUnion(paymentDetails),
        });

        alert("Payment successful! Your vehicles are now visible for the next 24 hours.");
        setIsSubscriptionActive(true); // Update the indicator immediately
        setTimeRemaining("24 hours, 0 minutes left"); // Reset timer
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getDocs(vehiclesCollectionRef);
      setVehicles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchVehicles();
  }, []);

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
        <div className="w-full">
          <div className="mb-2 flex w-full flex-col gap-2 rounded-md">
            <div className="flex w-full items-center justify-evenly rounded-lg border border-[#e8e8e8] bg-white py-3 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
              <Base64ImageUpload />
              <div className="">
                <h3 className="text-md font-semibold">
                  {auth.currentUser.displayName}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2 px-4 py-2">
          <h2 className="mb-1 text-center text-2xl font-semibold">
            Your Vehicle Listings
          </h2>
          <div className="flex items-center gap-2">
            <div onClick={() => setTimeout(() => navigate("/provider/add-vehicle"), 400)}>
              <Add />
            </div>
            <button className="renew" onClick={handleRenewal}>
              <Renewal />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div
              className={`h-4 w-4 rounded-full ${
                isSubscriptionActive ? "bg-green-500" : "bg-red-500"
              }`}
              title={isSubscriptionActive ? "Access Active" : "Access Expired"}
            ></div>
            <span className="text-sm font-medium">
              {isSubscriptionActive
                ? `Access Active (${timeRemaining})`
                : "Access Expired. Please Renew."}
            </span>
          </div>

          <Radio type={type} setType={setType} />

          <div className="barbar w-full overflow-y-scroll rounded-md shadow-xl">
            <ProviderVehicles type={type} />
          </div>
        </div>
      </div>

      <div className="text-center">
        <Logoff logout={logout} />
      </div>
    </div>
  );
};

export default ProviderDashboard;