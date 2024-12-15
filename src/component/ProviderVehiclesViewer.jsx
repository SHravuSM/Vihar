import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import ProviderVehicles from "./ProviderVehicles";
import Radio from "./Radio";
import HELMET from '../images/Helmet.gif'
import PHONE from '../images/Call.png'
import { useAuth } from "../context/AuthContext";

const ProviderVehiclesViewer = ({ providerId }) => {
    const { Vahana } = useAuth();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState('')
    const [mobile, setMobile] = useState('')
    const [vehicles, setVehicles] = useState([]);
    const [companyName, setCompanyName] = useState(""); // To store company name
    const [type, setType] = useState("Bike");

    // Fetch user data (company name)
    useEffect(() => {
        const fetchUserData = async () => {
            const userDoc = await getDoc(doc(db, "users", providerId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setPhoto(userData.photoURL)
                setMobile(userData.mobile)
                setCompanyName(userData.company || "No Company Provided"); // Default if company is not present
            }
        };

        fetchUserData();
    }, [providerId]);

    // Fetch provider's vehicles
    useEffect(() => {
        const fetchProviderVehicles = async () => {
            try {
                const vehiclesQuery = query(
                    collection(db, "vehicles"),
                    where("providerId", "==", providerId)
                );

                const querySnapshot = await getDocs(vehiclesQuery);
                const vehiclesList = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                console.log(vehiclesList);
                setVehicles(vehiclesList);
            } catch (err) {
                console.error("Error fetching vehicles:", err);
            }
        };

        fetchProviderVehicles();
    }, [providerId]);

    // Filter vehicles based on the type and sold status
    const filteredVehicles = vehicles.filter(
        (vehicle) => vehicle.type === type && !vehicle.isSold
    );

    return (
        <div className="relative flex max-h-full w-full flex-col items-center gap-2 p-2">
            <div className="relative flex w-full flex-col items-center">
                <div className="w-full">
                    <div className="mb-2 flex w-full flex-col gap-2 rounded-md">
                        <div className="flex w-full items-center justify-evenly rounded-lg border border-[#e8e8e8] bg-white py-3 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                            <div className="flex items-center justify-around w-full">
                                <div className="flex items-center justify-around gap-7">
                                    <img className="rounded-full h-16 object-cover shadow-sm" src={photo} />
                                    <h3 className="text-2xl font-semibold">{companyName}</h3>
                                </div>
                                <div onClick={() => window.location.href = `tel:${mobile}`} className="flex flex-col items-center">
                                    <img className="h-8" src={PHONE} alt="call" />
                                    <p>Call</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col items-center gap-2 px-4 py-2">
                    <h2 className="mb-1 text-center text-2xl font-semibold">
                        Vehicles by this Provider
                    </h2>

                    <Radio type={type} setType={setType} />

                    <div className="barbar w-full overflow-y-scroll rounded-md shadow-xl">
                        {filteredVehicles.length === 0 ? (
                            <p>No vehicles available of selected type or all are sold.</p>
                        ) : (
                            filteredVehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className={`grid h-32 grid-cols-[1fr_2fr] items-center px-2 w-full rounded shadow-md ${vehicle.type === "Bike" ? "shadow-[#92adde]" : "shadow-red-200"
                                        } transition-opacity duration-300`}
                                >
                                    <div className="w-32">
                                        <img
                                            src={Vahana[vehicle.name]?.[0] || "https://via.placeholder.com/150"}
                                            alt={vehicle.name}
                                            className={`${vehicle.isSold ? "opacity-30" : "opacity-100"
                                                } h-28 w-28 object-contain ${vehicle.type === "Bike"
                                                    ? "drop-shadow-[0px_0px_50px_#005aeb]"
                                                    : "drop-shadow-[0px_0px_50px_red]"
                                                }`}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center text-[12px]">
                                        <div className="flex items-center gap-1">
                                            <h3 className="text-sm font-semibold">{vehicle.name}</h3>
                                            {vehicle.helmetsIncluded && <img className="h-4" src={HELMET} alt="" />}
                                        </div>
                                        {/* <p>{vehicle.registrationNo}</p> */}
                                        <p>₹{vehicle.price} per day</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderVehiclesViewer;