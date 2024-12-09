import React, { useState, useEffect, useRef } from "react";
import Radio from "./Radio"; // Component for selecting vehicle type
import { useAuth } from "../context/AuthContext";
import LOPA from "./LOPA"; // Loading spinner component
import Close from "../images/Close.png";
import RIGHT from "../images/Right.png";
import LEFT from "../images/Left.png";
import HELMET from '../images/Helmet.gif'
import { useSwipeable } from "react-swipeable";
import SwipeToCallButton from "./SwipeToCallButton";
import useFetchVehicles from "../hooks/useFetchVehicles"; // Custom hook for fetching vehicles
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firebase Firestore functions

const VehicleList = () => {
  const { Vahana } = useAuth();
  const [type, setType] = useState("Bike"); // Default to "Bike"
  const { vehicles, loading, error, comName } = useFetchVehicles(type);

  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [providerMobile, setProviderMobile] = useState({}); // To store provider's mobile number
  const modalRef = useRef(null);

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentImageIndex(0);
    setShowModal(true);
    fetchProviderMobile(vehicle.providerId); // Fetch provider mobile when modal opens
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setProviderMobile(null); // Reset mobile number when modal closes
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handleSwipeLeft = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === Vahana[selectedVehicle.name].length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? Vahana[selectedVehicle.name].length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    delta: 10,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const handlePrev = () => handleSwipeRight();
  const handleNext = () => handleSwipeLeft();

  // Fetch provider mobile number from Firestore using providerId
  const fetchProviderMobile = async (providerId) => {
    const db = getFirestore();
    const providerDocRef = doc(db, "users", providerId); // Assuming "users" is your collection
    const providerDoc = await getDoc(providerDocRef);

    if (providerDoc.exists()) {
      const providerData = providerDoc.data();
      setProviderMobile({ mobile: providerData.mobile, company: providerData.company }); // Set the mobile number
    } else {
      console.log("No such provider!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="">
        <h2 className="text-center text-xl font-bold">Available Vehicles for Rent</h2>
        <h3 className="border text-sm text-gray-700 mt-4 mb-2 text-center px-4 py-2 bg-yellow-50 border-l-4 border-yellow-400">
          For <span className="text-blue-500">Security</span> purposes, we keep your ID proofs <span className="text-green-500">Safely</span> until returning the Vehicle's safely.
        </h3>
      </div>

      <div className="flex flex-col items-center w-full gap-3 pt-0 p-4 pr-1 pl-1">
        <Radio type={type} setType={setType} /> {/* Filter component */}

        {loading ? (
          <div className="flex h-[80vh] w-full items-center justify-center rounded p-2 shadow-[#9bb8e0]">
            <LOPA />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : vehicles.length === 0 ? (
          <p className="text-center w-full">No vehicles available for this type</p>
        ) : (
          <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`${type == 'Bike' ? 'shadow-blue-300' : 'shadow-red-300'} flex flex-col items-start p-3 gap-2 border rounded-md shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 `}
                onClick={() => openModal(vehicle)}
              >
                <img
                  src={Vahana[vehicle.name]?.[0] || "https://via.placeholder.com/150"}
                  alt={vehicle.name}
                  className="w-full h-32 object-contain"
                />
                {/* <h3>{vehicle.}</h3> */}
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm font-medium">{vehicle.name}</h3>
                    {vehicle.helmetsIncluded ? <img className="h-4" src={HELMET} alt="" /> : <></>}
                  </div>
                  <p className="text-sm">₹{vehicle.price}/day</p>
                  {/* <p className="text-xs text-gray-600">{vehicle.location}</p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-md rounded-lg bg-white shadow-lg p-6 space-y-4 md:max-w-lg"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
            >
              <img className="h-5" src={Close} alt="Close" />
            </button>
            <div className="flex items-center justify-center gap-1">
              <h2 className="text-2xl font-semibold text-center">{selectedVehicle.name}</h2>
              {selectedVehicle.helmetsIncluded ? <img className="h-6" src={HELMET} alt="" /> : <></>}
            </div>
            <div
              {...swipeHandlers}
              className="relative flex items-center justify-center gap-2 overflow-hidden"
            >
              <button
                onClick={handlePrev}
                className="absolute left-0 p-2 text-gray-500 hover:text-gray-700 z-10"
              >
                <img className="h-6" src={LEFT} alt="Previous" />
              </button>
              <img
                src={Vahana[selectedVehicle.name]?.[currentImageIndex] || "https://via.placeholder.com/150"}
                alt={selectedVehicle.name}
                className="w-48 h-48 object-contain"
              />
              <button
                onClick={handleNext}
                className="absolute right-0 p-2 text-gray-500 hover:text-gray-700 z-10"
              >
                <img className="h-6" src={RIGHT} alt="Next" />
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col gap-0">
                <p className="text-gray-800">{selectedVehicle.description}</p>
                <p className="text-sm font-semibold">{providerMobile.company}</p>
                <p className="text-lg font-semibold">₹{selectedVehicle.price}/day</p>
              </div>
              {/* Pass the provider's mobile number to the SwipeToCallButton */}
              {providerMobile && <SwipeToCallButton mobile={providerMobile.mobile} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleList;