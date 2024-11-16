// import { useState } from "react";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const AddVehicle = () => {
//   const [name, setName] = useState("");
//   const [type, setType] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   // const [imageUrl, setImageUrl] = useState(""); // Optional image URL field
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const auth = getAuth();
//   const db = getFirestore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const user = auth.currentUser;
//     //////console.log(user);

//     if (!user) {
//       //////console.error("User is not authenticated");
//       return;
//     }
//     else {
//       try {
//         await addDoc(collection(db, "vehicles"), {
//           providerId: auth.currentUser.uid,
//           name,
//           type,
//           price,
//           description,
//           location,
//         });
//         alert("Vehicle added successfully");
//       } catch (error) {
//         //////console.error("Error adding vehicle: ", error);
//         alert("There was an error adding the vehicle. Please try again.");
//       }
//     }

//     setLoading(false);

//     // Reset form fields
//     setName("");
//     setType("");
//     setPrice("");
//     setDescription("");
//     setLocation("");
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl text-white font-semibold text-center mb-4">Add New Vehicle</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Vehicle Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Vehicle Type"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Price per Day"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Image URL (optional)"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className={`w-full p-2 text-white ${loading ? "bg-gray-400" : "bg-blue-500"} rounded`}
//           disabled={loading}
//         >
//           {loading ? "Adding..." : "Add Vehicle"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddVehicle;

import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import Rupee from "../images/Rupee.png";
import Adding from "./Adding";

const AddVehicle = () => {
  const { Vahana } = useAuth();
  const [name, setName] = useState("");
  const [type, setType] = useState("Bike");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // const [imageUrl, setImageUrl] = useState(""); // Image URL field
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);
    const matches = Object.keys(Vahana).filter((EV) =>
      EV.toLowerCase().includes(input.toLowerCase()),
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const user = auth.currentUser;

    if (!user) {
      alert("User is not authenticated");
      return;
    }

    try {
      await addDoc(collection(db, "vehicles"), {
        providerId: user.uid,
        name,
        type,
        price,
        description,
        location,
      });
      setName("");
      setType("Bike");
      setPrice("");
      setDescription("");
      setLocation("");
    } catch (error) {
      alert("Error adding vehicle. Please try again.");
    }
    // setLoading(false);
  };

  return (
    <div className="flex h-screen flex-col items-center gap-3 border pl-7 pr-7 pt-4">
      <h2 className="text-center text-2xl font-semibold text-black">
        Add New Vehicle
      </h2>
      <img
        className="h-36 rounded drop-shadow-[1px_1px_2px_black]"
        src={Vahana[name]}
        alt=""
      />
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={name}
            onChange={handleNameChange}
            required
            className="w-full rounded border p-2"
          />
          {suggestions.length > 0 && (
            <ul className="absolute mt-1 w-full rounded border bg-white shadow-md">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-1">
          <div className="flex w-[70%] items-center justify-evenly rounded border bg-white">
            <img className="h-6 w-6" src={Rupee} alt="" />
            <input
              type="number"
              placeholder="Price per Day"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-[84%] border-l-2 border-yellow-400 p-2"
            />
          </div>

          <select
            className="w-[30%] rounded"
            name="Vehicle type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
        <Adding handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddVehicle;

{
  /* <input
          type="op"
          placeholder="Vehicle Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full p-2 border rounded"
        /> */
}

{
  /* <input
          type="text"
          placeholder="Image URL (auto-filled)"
          value={imageUrl}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        /> */
}
{
  /* <button
          type="submit"
          className={`w-full p-2 text-white ${loading ? "bg-gray-400" : "bg-blue-500"} rounded`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button> */
}
