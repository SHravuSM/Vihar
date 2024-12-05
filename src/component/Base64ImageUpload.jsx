// import React, { useState, useEffect } from 'react';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import Profile from '../images/Profile.png'
// import { auth, db } from '../firebaseConfig'; // Assuming db is your Firestore instance

// // Function to convert the image to Base64 string
// const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//     });
// };

// const Base64ImageUpload = () => {
//     const [image, setImage] = useState(null);  // For preview
//     const [loading, setLoading] = useState(false);  // For loading state
//     const [photoURL, setPhotoURL] = useState(null);  // For storing user's photoURL from Firestore
//     // const [defaultImage, setDefaultImage] = useState('https://www.example.com/default-avatar.png'); // Fallback image
//     const [photo, setPhoto] = useState(null);

//     // Fetch the user's photoURL from Firestore when the component loads
//     useEffect(() => {
//         const fetchUserPhoto = async () => {
//             const user = auth.currentUser;
//             if (user) {
//                 // Fetch user document from Firestore
//                 const userDocRef = doc(db, 'users', user.uid);
//                 const docSnap = await getDoc(userDocRef);

//                 if (docSnap.exists()) {
//                     const data = docSnap.data();
//                     // If the user has a photoURL, set it; otherwise, use the fallback image
//                     setPhotoURL(data.photoURL || Profile);
//                 } else {
//                     console.log('No such document!');
//                 }
//             }
//         };

//         fetchUserPhoto();
//     }, [image]);

//     const handleImageChange = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // Set image preview before uploading
//             setImage(URL.createObjectURL(file));  // For image preview

//             try {
//                 // Convert image to Base64
//                 const base64Image = await convertToBase64(file);

//                 const user = auth.currentUser;
//                 if (user) {
//                     // Update Firestore document with Base64 image data
//                     const userDocRef = doc(db, 'users', user.uid);
//                     await updateDoc(userDocRef, {
//                         photoURL: base64Image,  // Store the Base64 image string in Firestore
//                     });

//                     // alert('Image uploaded successfully!');
//                     setPhotoURL(base64Image);  // Update the state to show the new image
//                 } else {
//                     alert('User is not authenticated.');
//                 }
//             } catch (error) {
//                 console.error('Error uploading image:', error);
//                 alert('Error uploading image. Please try again.');
//             }
//         }
//     };

//     return (
//         <div className="flex justify-center items-center">
//             {/* Image upload container with round shape */}
//             <div className="relative w-20 h-20 rounded-full overflow-hidden drop-shadow-[0px_0px_6px_black] cursor-pointer">
//                 {/* Display user's photo from Firestore or fallback image */}
//                 <img
//                     src={image || Profile}  // Use uploaded image or Firestore photoURL
//                     alt="User Profile"
//                     className="w-full h-full object-top"
//                 />

//                 {/* Hidden file input that will trigger when clicking the circular div */}
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//             </div>

//             {/* Optional: Displaying loading state */}
//             {loading && <div className="text-center mt-2">Uploading...</div>}
//         </div>
//     );
// };

// export default Base64ImageUpload;


import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Profile from '../images/Profile.png'; // Default profile image

// Function to convert the image to Base64 string
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const Base64ImageUpload = () => {
    const [image, setImage] = useState(null); // For preview
    const [photoURL, setPhotoURL] = useState(Profile); // Default or fetched photo
    const [loading, setLoading] = useState(false); // Loading state
    const [errorMessage, setErrorMessage] = useState(""); // Error feedback

    // Fetch user's photoURL from Firestore
    useEffect(() => {
        const fetchUserPhoto = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setPhotoURL(data.photoURL || Profile); // Use existing photoURL or fallback image
                    } else {
                        console.error('User document does not exist!');
                    }
                } catch (error) {
                    console.error('Error fetching user photo:', error);
                }
            }
        };

        fetchUserPhoto();
    }, []);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true); // Start loading state
            setErrorMessage(""); // Clear error messages

            try {
                // Convert image to Base64
                const base64Image = await convertToBase64(file);
                const user = auth.currentUser;

                if (user) {
                    // Update Firestore with Base64 image
                    const userDocRef = doc(db, 'users', user.uid);
                    await updateDoc(userDocRef, {
                        photoURL: base64Image,
                    });

                    setImage(base64Image); // Update preview with uploaded image
                    setPhotoURL(base64Image); // Update profile photo
                    alert('Profile image updated successfully!');
                } else {
                    setErrorMessage('User not authenticated.');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setErrorMessage('Error uploading image. Please try again.');
            } finally {
                setLoading(false); // Stop loading state
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Profile Image */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden drop-shadow-[0px_0px_6px_rgba(0,0,0,0.5)]">
                <img
                    src={image || photoURL || Profile}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                />
                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {/* Upload Feedback */}
            {loading && <p className="text-sm text-blue-500">Uploading...</p>}
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        </div>
    );
};

export default Base64ImageUpload;