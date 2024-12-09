// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import Renewal from "./Renewal";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedUserId, setExpandedUserId] = useState(null);
//   const [userVehicles, setUserVehicles] = useState([]);
//   const [vehicleBeingEdited, setVehicleBeingEdited] = useState(null);
//   const [vehicleForm, setVehicleForm] = useState({
//     name: "",
//     price: "",
//     location: "",
//     type: "",
//   });
//   const [selectedVehicleType, setSelectedVehicleType] = useState("All");
//   const db = getFirestore();

//   // Handle subscription renewal
//   const handleRenewal = async (userId) => {
//     try {
//       const userRef = doc(db, "users", userId);
//       let date = new Date();

//       const paymentDetails = {
//         transactionId: `txn_${Math.floor(Math.random() * 1000000)}`, // Example: Generate a random transaction ID
//         amount: 25, // Example: Subscription cost
//         Date: date.toISOString(),
//       };

//       await updateDoc(userRef, {
//         isPaid: true, // Mark as paid
//         paymentDetails: paymentDetails, // Store payment details
//         paymentDate: date, // Store the current timestamp
//         paymentHistory: paymentDetails, // Append to payment history
//       });

//       // Update the local state
//       setUsers(
//         users.map((user) =>
//           user.id === userId ? { ...user, isPaid: true } : user
//         )
//       );

//       alert("Renewal successful! Subscription is now active.");
//     } catch (error) {
//       console.error("Error processing renewal: ", error);
//     }
//   };

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const usersRef = collection(db, "users");
//         const userSnapshot = await getDocs(usersRef);
//         const userList = userSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUsers(userList);
//       } catch (error) {
//         console.error("Error fetching users: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [db]);

//   // Other existing functions remain unchanged...

//   // Spinner while loading
//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div
//           role="status"
//           aria-live="polite"
//           className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"
//         ></div>
//         <p className="sr-only">Loading...</p> {/* For screen readers */}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h2 className="mb-6 text-3xl font-semibold text-gray-800">Manage Users</h2>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {users.length === 0 ? (
//           <div className="col-span-3 rounded-lg bg-white p-4 text-center shadow-md">
//             <p className="text-xl text-gray-500">No users found.</p>
//           </div>
//         ) : (
//           users.map((user) => (
//             <div
//               key={user.id}
//               className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
//             >
//               <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
//               <p className="text-gray-600">Email: {user.email}</p>
//               <p className="text-gray-600">User ID: {user.id}</p>
//               <p className="text-gray-600">Role: {user.role}</p>
//               <p className="text-gray-600">
//                 Subscription Status:{" "}
//                 {user.isPaid ? (
//                   <span className="text-blue-500 font-semibold">Active</span>
//                 ) : (
//                   <span className="text-red-600">Expired</span>
//                 )}
//               </p>

//               {!user.isPaid && (
//                 <Renewal userId={user.id} handleRenewal={handleRenewal} />
//               )}

//               {/* Other user details and actions */}
//               {/* Expand user vehicles */}
//               <button
//                 onClick={() => handleUserExpand(user.id)}
//                 className="mt-4 rounded-md bg-gray-300 px-4 py-2 text-gray-700"
//               >
//                 {expandedUserId === user.id ? "Hide Details" : "Show Details"}
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import Renewal from "./Renewal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const db = getFirestore();

  // Handle subscription renewal
  const handleRenewal = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const date = new Date();

      const paymentDetails = {
        transactionId: `txn_${Math.floor(Math.random() * 1000000)}`,
        amount: 25, // Subscription cost
        date: date.toISOString(),
      };

      // Update Firestore with new payment details
      await updateDoc(userRef, {
        isPaid: true,
        paymentDate: date,
        paymentHistory: [
          ...(users.find((user) => user.id === userId)?.paymentHistory || []),
          paymentDetails,
        ],
      });

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                isPaid: true,
                paymentDate: date.toISOString(),
                paymentHistory: [
                  ...(user.paymentHistory || []),
                  paymentDetails,
                ],
              }
            : user
        )
      );

      alert("Renewal successful! Subscription is now active.");
    } catch (error) {
      console.error("Error processing renewal: ", error);
      alert("An error occurred while renewing the subscription.");
    }
  };

  // Check subscription status and reset expired subscriptions
  const resetExpiredSubscriptions = (user) => {
    const currentTime = new Date();
    const paymentDate = new Date(user.paymentDate);
    const hoursDifference = Math.abs(currentTime - paymentDate) / 36e5; // Convert ms to hours

    // If subscription is older than 24 hours, mark it as expired
    if (hoursDifference >= 24) {
      return { ...user, isPaid: false };
    }
    return user;
  };

  // Fetch all users and reset expired subscriptions
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersRef = collection(db, "users");
        const userSnapshot = await getDocs(usersRef);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Reset expired subscriptions and update Firestore if needed
        const updatedUsers = userList.map((user) => {
          const updatedUser = resetExpiredSubscriptions(user);
          if (updatedUser.isPaid !== user.isPaid) {
            const userRef = doc(db, "users", user.id);
            updateDoc(userRef, { isPaid: false }); // Mark as expired
          }
          return updatedUser;
        });

        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [db]);

  // Toggle user vehicle details
  const handleUserExpand = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div
          role="status"
          aria-live="polite"
          className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"
        ></div>
        <p className="sr-only">Loading...</p> {/* For screen readers */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">Manage Users</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <div className="col-span-3 rounded-lg bg-white p-4 text-center shadow-md">
            <p className="text-xl text-gray-500">No users found.</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">User ID: {user.id}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <p className="text-gray-600">
                Subscription Status:{" "}
                {user.isPaid ? (
                  <span className="text-blue-500 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600">Expired</span>
                )}
              </p>

              {!user.isPaid && (
                <Renewal userId={user.id} handleRenewal={handleRenewal} />
              )}

              <button
                onClick={() => handleUserExpand(user.id)}
                className="mt-4 rounded-md bg-gray-300 px-4 py-2 text-gray-700"
              >
                {expandedUserId === user.id ? "Hide Details" : "Show Details"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;