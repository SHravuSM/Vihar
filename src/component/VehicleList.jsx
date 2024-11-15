// VehicleList.jsx
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Nav from "./Nav";
import { auth } from "../firebaseConfig";

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
            // //console.log(vehiclesList[0].type);

            const vehicles = vehiclesList.filter(each => {
                return each.type == type;
            })
            setVehicles(vehicles)
            setLoading(false);
        };

        fetchVehicles();
    }, [db, type]);

    return (
        <div className=" flex flex-col items-center p-1 gap-2 w-full">
            {!auth.currentUser?.displayName && <Nav white={true} />}
            <div className="flex flex-col w-full">
                {/* <h2 className="text-xl text-center font-bold">Available Vehicles for Rent</h2> */}
                <div className='flex items-center text-xl justify-around bg-white rounded-[20px] shadow-md w-full h-11 '>
                    <button onClick={() => setType('Bike')} className='px-2 text-blue-500 active:bg-blue-500 drop-shadow-lg'>Bikes</button>
                    <button onClick={() => setType('Scooter')} className='px-2 text-pink-500 active:bg-blue-500 drop-shadow-lg'>Scooters</button>
                    <button onClick={() => setType('Car')} className='px-2 text-slate-500 active:bg-blue-500 drop-shadow-lg'>Cars</button>
                </div >
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            )}
        </div>
    );
};

export default VehicleList;