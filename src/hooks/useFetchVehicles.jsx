// import { useState, useEffect } from "react";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// const useFetchVehicles = (type) => {
//     const [vehicles, setVehicles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const db = getFirestore();

//     useEffect(() => {
//         const fetchVehicles = async () => {
//             try {
//                 setLoading(true);

//                 const vehiclesRef = collection(db, "vehicles");
//                 const providersRef = collection(db, "users");

//                 const vehicleSnapshot = await getDocs(vehiclesRef);
//                 const providerSnapshot = await getDocs(providersRef);

//                 const providers = providerSnapshot.docs.reduce((acc, doc) => {
//                     acc[doc.id] = doc.data();
//                     return acc;
//                 }, {});

//                 const fetchedVehicles = vehicleSnapshot.docs
//                     .map((doc) => ({
//                         id: doc.id,
//                         ...doc.data(),
//                     }))
//                     .filter(
//                         (vehicle) =>
//                             vehicle.type === type &&
//                             providers[vehicle.providerId]?.isPaid
//                             && isPaymentWithin24Hours(providers[vehicle.providerId]?.paymentDate)
//                     )
//                     .map((vehicle) => ({
//                         ...vehicle,
//                         providerMobile: providers[vehicle.providerId]?.mobile,
//                     }));

//                 setVehicles(fetchedVehicles);
//             } catch (err) {
//                 setError("Failed to fetch vehicles");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchVehicles();
//     }, [type]);

//     const isPaymentWithin24Hours = (paymentDate) => {
//         if (!paymentDate) return false;
//         const paymentTimestamp = paymentDate.seconds * 1000;
//         const currentTime = Date.now();
//         return currentTime - paymentTimestamp <= 24 * 60 * 60 * 1000;
//     };

//     return { vehicles, loading, error };
// };

// export default useFetchVehicles;


// import { useState, useEffect, useMemo } from "react";
// import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

// const useFetchVehicles = (type) => {
//     const [vehicles, setVehicles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [comName, setComName] = useState('')
//     const [error, setError] = useState(null);
//     const db = getFirestore();

//     useEffect(() => {
//         const fetchVehicles = async () => {
//             try {
//                 setLoading(true);

//                 // Fetch vehicles and providers
//                 const vehiclesRef = collection(db, "vehicles");
//                 const providersRef = collection(db, "users");

//                 const vehicleSnapshot = await getDocs(vehiclesRef);
//                 const providerSnapshot = await getDocs(providersRef);

//                 // Map providers by ID
//                 const providers = providerSnapshot.docs.reduce((acc, doc) => {
//                     acc[doc.id] = doc.data();
//                     return acc;
//                 }, {});

//                 // Filter and map vehicles
//                 const fetchedVehicles = vehicleSnapshot.docs
//                     .map((doc) => ({
//                         id: doc.id,
//                         ...doc.data(),
//                     }))
//                     .filter(
//                         (vehicle) =>
//                             vehicle.type === type &&
//                             providers[vehicle.providerId]?.isPaid &&
//                             isPaymentWithin24Hours(providers[vehicle.providerId]?.paymentDate)
//                             // && setComName()
//                     )
//                     .map((vehicle) => ({
//                         ...vehicle,
//                         providerMobile: providers[vehicle.providerId]?.mobile,
//                     }));

                
                
//                 // setComName(CompanyName)
//                 setVehicles(fetchedVehicles);
//             } catch (err) {
//                 console.error("Error fetching vehicles:", err); // Log detailed error
//                 setError("Failed to fetch vehicles");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchVehicles();
//     }, [type, db]);

//     // Helper: Check if payment is within 24 hours
//     const isPaymentWithin24Hours = useMemo(() => (paymentDate) => {
//         if (!paymentDate) return false;
//         const paymentTimestamp = paymentDate.seconds * 1000;
//         const currentTime = Date.now();
//         return currentTime - paymentTimestamp <= 24 * 60 * 60 * 1000;
//     }, []);

//     return { vehicles, loading, error, comName };
// };

// export default useFetchVehicles;


// import { useState, useEffect, useMemo } from "react";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// const useFetchVehicles = (type) => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [comName, setComName] = useState("");
//   const [error, setError] = useState(null);
//   const db = getFirestore();

//   useEffect(()=>{
//              console.log(vehicles);
//         },[vehicles])

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         setLoading(true);

//         // Fetch vehicles and providers
//         const vehiclesRef = collection(db, "vehicles");
//         const providersRef = collection(db, "users");

//         const vehicleSnapshot = await getDocs(vehiclesRef);
//         const providerSnapshot = await getDocs(providersRef);

//         // Map providers by ID
//         const providers = providerSnapshot.docs.reduce((acc, doc) => {
//           acc[doc.id] = doc.data();
//           return acc;
//         }, {});

//         // Filter and map vehicles
//         const fetchedVehicles = vehicleSnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(
//             (vehicle) =>
//               !vehicle.isSold && // Filter vehicles where isSold is false
//               vehicle.type === type &&
//               providers[vehicle.providerId]?.isPaid &&
//               isPaymentWithin24Hours(providers[vehicle.providerId]?.paymentDate)
//           )
//           .map((vehicle) => ({
//             ...vehicle,
//             providerMobile: providers[vehicle.providerId]?.mobile,
//           }));

//         setVehicles(fetchedVehicles);
//       } catch (err) {
//         console.error("Error fetching vehicles:", err); // Log detailed error
//         setError("Failed to fetch vehicles");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicles();
//   }, [type, db]);

//   // Helper: Check if payment is within 24 hours
//   const isPaymentWithin24Hours = useMemo(
//     () => (paymentDate) => {
//       if (!paymentDate) return false;
//       const paymentTimestamp = paymentDate.seconds * 1000;
//       const currentTime = Date.now();
//       return currentTime - paymentTimestamp <= 24 * 60 * 60 * 1000;
//     },
//     []
//   );

//   return { vehicles, loading, error, comName };
// };

// export default useFetchVehicles;


import { useState, useEffect, useMemo } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const useFetchVehicles = (type) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comName, setComName] = useState("");
  const [error, setError] = useState(null);
  const db = getFirestore();

  // Debug: Log vehicles when they change
  useEffect(() => {
    console.log("Vehicles array updated:", vehicles);
  }, [vehicles]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);

        // Fetch vehicles and providers
        const vehiclesRef = collection(db, "vehicles");
        const providersRef = collection(db, "users");

        const vehicleSnapshot = await getDocs(vehiclesRef);
        const providerSnapshot = await getDocs(providersRef);

        // Map providers by ID
        const providers = providerSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});

        // Filter and map vehicles
        const fetchedVehicles = vehicleSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (vehicle) =>
              !vehicle.isSold && // Filter vehicles where isSold is false
              vehicle.type === type &&
              providers[vehicle.providerId]?.isPaid &&
              isPaymentWithin24Hours(providers[vehicle.providerId]?.paymentDate)
          );

        // Debug: Log fetched vehicles before setting the state
        console.log("Fetched Vehicles:", fetchedVehicles);

        setVehicles(fetchedVehicles);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [type, db]);

  // Helper: Check if payment is within 24 hours
  const isPaymentWithin24Hours = useMemo(
    () => (paymentDate) => {
      if (!paymentDate) return false;
      const paymentTimestamp = paymentDate.seconds * 1000;
      const currentTime = Date.now();
      return currentTime - paymentTimestamp <= 24 * 60 * 60 * 1000;
    },
    []
  );

  return { vehicles, loading, error, comName };
};

export default useFetchVehicles;