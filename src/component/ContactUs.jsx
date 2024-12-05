// import React from "react";
// import '@fortawesome/fontawesome-free/css/all.css';

// const ContactUs = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Contact Information */}
//         <div className="flex flex-col justify-center p-8 bg-white shadow-md rounded-lg">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>
//           <p className="text-gray-600 mb-6">
//             If is any problem occured Contact Us
//           </p>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <span className="text-yellow-500 text-xl">
//                 <i className="fas fa-envelope"></i>
//               </span>
//               <p className="text-gray-700">Vihar@gmail.com</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-yellow-500 text-xl">
//                 <i className="fas fa-phone"></i>
//               </span>
//               <p className="text-gray-700">+91 0123456789</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-yellow-500 text-xl">
//                 <i className="fas fa-map-marker-alt"></i>
//               </span>
//               <p className="text-gray-700">Hampi</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Illustration */}
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/400x300?text=Contact+Us"
            alt="Contact Illustration"
            className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>

        {/* Right Section - Contact Information */}
        <div className="flex flex-col justify-center p-8 bg-white shadow-lg rounded-lg border border-yellow-200">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-4 text-center lg:text-left">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6 text-lg text-center lg:text-left">
            Facing any issues or have any questions? Feel free to reach out to us!
          </p>
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center space-x-4">
              <span className="text-yellow-500 text-2xl">
                <i className="fas fa-envelope"></i>
              </span>
              <p className="text-gray-700 font-medium text-lg">Vihar@gmail.com</p>
            </div>
            {/* Phone */}
            <div className="flex items-center space-x-4">
              <span className="text-yellow-500 text-2xl">
                <i className="fas fa-phone"></i>
              </span>
              <p className="text-gray-700 font-medium text-lg">+91 0123456789</p>
            </div>
            {/* Location */}
            <div className="flex items-center space-x-4">
              <span className="text-yellow-500 text-2xl">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <p className="text-gray-700 font-medium text-lg">Hampi</p>
            </div>
          </div>
          {/* <button className="mt-6 w-full py-3 text-lg font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition">
            Send Us a Message
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;