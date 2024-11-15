import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AddVehicle = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // const [imageUrl, setImageUrl] = useState(""); // Optional image URL field
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    //////console.log(user);
    
    if (!user) {
      //////console.error("User is not authenticated");
      return;
    }
    else {
      try {
        await addDoc(collection(db, "vehicles"), {
          providerId: auth.currentUser.uid,
          name,
          type,
          price,
          description,
          location,
        });
        alert("Vehicle added successfully");
      } catch (error) {
        //////console.error("Error adding vehicle: ", error);
        alert("There was an error adding the vehicle. Please try again.");
      }
    }

    setLoading(false);

    // Reset form fields
    setName("");
    setType("");
    setPrice("");
    setDescription("");
    setLocation("");
  };


  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-white font-semibold text-center mb-4">Add New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Vehicle Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Vehicle Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price per Day"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        {/* <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded"
        /> */}
        <button
          type="submit"
          className={`w-full p-2 text-white ${loading ? "bg-gray-400" : "bg-blue-500"} rounded`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
