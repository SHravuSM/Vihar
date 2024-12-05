import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="flex flex-col justify-center p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-6">
            If is any problem occured Contact Us
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-yellow-500 text-xl">
                <i className="fas fa-envelope"></i>
              </span>
              <p className="text-gray-700">Vihar@gmail.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-yellow-500 text-xl">
                <i className="fas fa-phone"></i>
              </span>
              <p className="text-gray-700">+91 9019206067</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-yellow-500 text-xl">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <p className="text-gray-700">Hampi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;