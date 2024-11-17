import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Nav from "./Nav";
import Loader from "../images/Loader.gif";
import Radio from "./Radio";
import { useAuth } from "../context/AuthContext";
import GetDetails from "./GetDetails";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const [type, setType] = useState("Bike");
  const { Vahana } = useAuth();

  // To store user location
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  // Fetch vehicles based on user location and vehicle type
  useEffect(() => {
    // Fetch user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    const fetchVehicles = async () => {
      const vehiclesRef = collection(db, "vehicles");
      const querySnapshot = await getDocs(vehiclesRef);

      const vehiclesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter vehicles by selected type
      const vehicles = vehiclesList.filter((each) => each.type === type);

      // Sort vehicles by proximity to user location
      if (userLocation.latitude && userLocation.longitude) {
        vehicles.sort((a, b) => {
          const distanceA = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.latitude,
            a.longitude,
          );
          const distanceB = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.latitude,
            b.longitude,
          );
          return distanceA - distanceB;
        });
      }

      setVehicles(vehicles);
      setLoading(false);
    };

    fetchVehicles();
  }, [db, type, userLocation]);

  // Function to calculate distance between two latitudes and longitudes
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div className="flex w-full h-full pt-4 flex-col items-center gap-2">

      <div className="flex w-full flex-col">
        <h2 className="text-center text-xl font-bold">
          Available Vehicles for Rent
        </h2>
      </div>
      <Radio type={type} setType={setType} />

      {loading ? (
        <div className="flex h-[70vh] w-full items-center justify-center">
          <img src={Loader} alt="" />
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 gap-2 h-full rounded-md p-2">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex h-full w-full flex-col items-center rounded-md border"
            >
              <div className="flex h-[60%] w-full items-center justify-center">
                <img
                  src={
                    Vahana[vehicle.name] || "https://via.placeholder.com/150"
                  }
                  alt={vehicle.name}
                  className="h-[90%] rounded object-cover"
                />
              </div>
              <div
                className={`h-[40%] w-full p-1 ${vehicle.type === "Bike" && "bg-[#92adde]"} ${vehicle.type === "Scooter" && "bg-red-200"} rounded-[0_0_5px_5px]`}
              >
                <h3 className="text-sm font-semibold">{vehicle.name}</h3>
                <p className="text-sm">₹{vehicle.price}/day</p>
                <p>{vehicle.location}</p>
                <GetDetails type={vehicle.type} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
