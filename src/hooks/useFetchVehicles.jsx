import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const useFetchVehicles = (type) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);

                const vehiclesRef = collection(db, "vehicles");
                const providersRef = collection(db, "users");

                const vehicleSnapshot = await getDocs(vehiclesRef);
                const providerSnapshot = await getDocs(providersRef);

                const providers = providerSnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data();
                    return acc;
                }, {});

                const fetchedVehicles = vehicleSnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter(
                        (vehicle) =>
                            vehicle.type === type &&
                            providers[vehicle.providerId]?.isPaid &&
                            isPaymentWithin24Hours(providers[vehicle.providerId]?.paymentDate)
                    )
                    .map((vehicle) => ({
                        ...vehicle,
                        providerMobile: providers[vehicle.providerId]?.mobile,
                    }));

                setVehicles(fetchedVehicles);
            } catch (err) {
                setError("Failed to fetch vehicles");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [type]);

    const isPaymentWithin24Hours = (paymentDate) => {
        if (!paymentDate) return false;
        const paymentTimestamp = paymentDate.seconds * 1000;
        const currentTime = Date.now();
        return currentTime - paymentTimestamp <= 24 * 60 * 60 * 1000;
    };

    return { vehicles, loading, error };
};

export default useFetchVehicles;