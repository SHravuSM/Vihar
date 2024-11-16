// VehicleList.jsx
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Nav from "./Nav";
import Loader from "../images/Loader.gif";
import Card from "./Card";
import Radio from "./Radio";
import { useAuth } from "../context/AuthContext";
import GetDetails from './GetDetails';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const [type, setType] = useState("Bike");
    const { Vahana } = useAuth();

    useEffect(() => {
        const fetchVehicles = async () => {
            const vehiclesRef = collection(db, "vehicles");
            const querySnapshot = await getDocs(vehiclesRef);

            const vehiclesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const vehicles = vehiclesList.filter((each) => {
                return each.type == type;
            });
            setVehicles(vehicles);
            console.log(vehicles);

            setLoading(false);
        };

        fetchVehicles();

        return () => console.log("No Vehicles");
    }, [db, type]);

    return (
        <div className="flex w-full flex-col items-center gap-1 bg-white p-1">
            <Nav />
            <div className="flex w-full flex-col">
                <h2 className="text-center text-xl font-bold">
                    Available Vehicles for Rent
                </h2>
                <Radio type={type} setType={setType} />
            </div>

            {loading ? (
                <div className="flex h-[70vh] w-full items-center justify-center">
                    <img src={Loader} alt="" />
                </div>
            ) : (
                <div className="rounded-md grid gap-2 w-full p-1 grid-cols-2">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white border-2 h-full flex flex-col items-center w-full rounded-md">
                            <div className="w-full flex p-1 items-center justify-center">
                                <img
                                    src={Vahana[vehicle.name] || "https://via.placeholder.com/150"}
                                    alt={vehicle.name}
                                    className="w-full object-cover rounded"
                                />
                            </div>
                            <div className="w-full border pr-1 pl-1 h-full bg-blue-200 rounded-[0_0_5px_5px]">
                                <h3 className="text-sm font-semibold">{vehicle.name}</h3>
                                <p className="text-sm">₹{vehicle.price}/day</p>
                                <p>{vehicle.location}</p>
                                <GetDetails />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VehicleList;
