// VehicleList.jsx
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Nav from "./Nav";
import Loader from '../images/Loader.gif'
import { auth } from "../firebaseConfig";
import Card from './Card';
import Radio from "./Radio";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const [type, setType] = useState('Bike')

    useEffect(() => {
        const fetchVehicles = async () => {
            const vehiclesRef = collection(db, "vehicles");
            const querySnapshot = await getDocs(vehiclesRef);

            const vehiclesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const vehicles = vehiclesList.filter(each => {
                return each.type == type;
            })
            setVehicles(vehicles)
            setLoading(false);
        };

        fetchVehicles();
    }, [db, type]);

    return (
        <div className=" flex flex-col items-center gap-1 bg-white p-1 w-full">
            <Nav />
            <div className="flex flex-col w-full">
                <h2 className="text-xl text-center font-bold">Available Vehicles for Rent</h2>
                <Radio setType={setType} />
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-[70vh] w-full"><img src={Loader} alt="" /></div>
            ) : (
                <div className="flex flex-col gap-1 rounded-md w-full ">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="flex bg-red-200 h-32 justify-evenly items-center w-full rounded-md">
                            <div className="rounded shadow">
                                <img
                                    src={vehicle.imageUrl || "https://via.placeholder.com/150"}
                                    alt={vehicle.name}
                                    className="h-24 rounded shadow-md object-cover"
                                />
                            </div>
                            <div className="w-[50%] text-[12px] flex flex-col items-center ">
                                <h3 className="text-sm font-semibold">{vehicle.name}</h3>
                                <p>{vehicle.type}</p>
                                <p>₹{vehicle.price} per day</p>
                                <p>{vehicle.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
                // <div className="flex flex-col gap-1 rounded-md w-full ">
                //     <Card />
                // </div>
            )}
        </div>
    );
};

export default VehicleList;