// ProviderDashboard.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GoogleAuthProvider, reauthenticateWithPopup, signOut, deleteUser } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import ProviderVehicles from './ProviderVehicles';
import Nav from './Nav';

const ProviderDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ name: '', type: '', location: '', price: '', imageUrl: '' });
  const [imageUpload, setImageUpload] = useState(null);
  const [userRole, setUserRole] = useState(null);  // To store the role of the current user
  const vehiclesCollectionRef = collection(db, 'vehicles');
  const [type, setType] = useState('Bike')

  const reauthenticateWithGoogle = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is logged in.");
      return;
    }

    // console.log(auth.currentUser);
    

    try {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, provider);
      alert("Reauthenticated successfully.");
    } catch (error) {
      console.error("Reauthentication Error:", error);
      alert("Error reauthenticating.");
    }
  };
  // Check user role
  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;
      // console.log(user);

      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);  // Assuming role is stored in Firestore under 'users' collection
        }
      }
    };
    checkUserRole();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getDocs(vehiclesCollectionRef);
      setVehicles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    fetchVehicles();
  }, []);

  const handleImageUpload = async () => {
    if (!imageUpload) return null;
    const imageRef = ref(storage, `images/${imageUpload.name}-${Date.now()}`);
    await uploadBytes(imageRef, imageUpload);
    return await getDownloadURL(imageRef);
  };

  const addVehicle = async () => {
    const imageUrl = await handleImageUpload();
    if (imageUrl) {
      const vehicleData = { ...newVehicle, imageUrl };
      await addDoc(vehiclesCollectionRef, vehicleData);
      setNewVehicle({ name: '', type: '', location: '', price: '', imageUrl: '' });
      setImageUpload(null);

      const data = await getDocs(vehiclesCollectionRef);
      setVehicles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  const deleteVehicle = async (id) => {
    const vehicleDoc = doc(db, 'vehicles', id);
    // reauthenticateWithGoogle();
    await deleteDoc(vehicleDoc);
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  const logout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      window.location.href = '/'; // Redirects to login page
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user is logged in.");
      return;
    }
    const provider = new GoogleAuthProvider();
    await reauthenticateWithPopup(user, provider);
    alert("Reauthenticated successfully.");
    await deleteUser(user);
    window.location.href = '/';
    alert("Account deleted successfully.");
  };

  //console.log(auth.currentUser);
  //console.log(auth.currentUser.displayName);
  //console.log(auth.currentUser.photoURL);
  // //console.log(auth.currentUser.metadata.lastLoginAt);
  //console.log(auth.currentUser.metadata.lastLoginAt);


  return (
    <div className=" bg-gray-100 relative w-full min-h-screen flex flex-col gap-1 items-center ">
      {auth?.currentUser && <Nav  />}
      <NavLink className='px-2 w-full' to='/provider/account' state={userRole}>
        <div className='mb-2 flex flex-col gap-2 rounded-md w-full'>
          <h1 className="text-lg text-slate-500 font-bold text-center w-full">Vehicle Provider Dashboard</h1>
          <div className='w-full flex justify-around shadow-md border py-3 rounded-lg items-center '>
            <img className='rounded-[50%] h-16 border border-black' src={auth.currentUser.photoURL} alt="" />
            <div className=''>
              <h3 className='text-md font-semibold underline'>{auth.currentUser.displayName}</h3>
            </div>
          </div>
        </div>
      </NavLink>
      <div className='w-full flex flex-col py-2 gap-2 px-4'>
        <h2 className="text-2xl mb-1 font-semibold text-center ">Your Vehicle Listings</h2>
        <div className='w-full items-center flex self-start gap-1'>
          <NavLink className='p-6 shadow-lg w-[70%] text-[16px] bg-blue-600 text-center text-white py-2 rounded ' to='/provider/add-vehicle'>Add Vehicles</NavLink>
          <NavLink className='shadow-md w-[30%]  bg-blue-600 text-center text-white py-2 rounded ' to='/provider/account'>Renew</NavLink>
        </div>
        <div className='border-2 flex items-center text-lg justify-around rounded-[20px] shadow-md w-full h-10 '>
          <button onClick={()=>setType('Bike')} className='px-2 text-blue-500 active:bg-blue-500 drop-shadow-lg'>Bikes</button>
          <button onClick={()=>setType('Scooter')} className='px-2 text-pink-500 active:bg-blue-500 drop-shadow-lg'>Scooters</button>
          <button onClick={()=>setType('Car')} className='px-2 text-slate-500 active:bg-blue-500 drop-shadow-lg'>Cars</button>
        </div >
        <div className='w-full'>

        <ProviderVehicles type={type} />
        </div>

      </div>

      <div className="mt-8 relative bottom-3 text-center">
        <button
          onClick={logout}
          className="w-full bg-green-500 text-white py-2 rounded px-4"
        >
          Logout
        </button>

        {/* Conditionally render Delete Account button based on role */}
      </div>
    </div>
  );
};

export default ProviderDashboard;
