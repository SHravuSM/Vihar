import React, { useState } from "react";

const SwipeToCallButton = ({ phoneNumber }) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const handleSwipe = () => {
    setIsSwiped(true);
    setTimeout(() => {
      window.location.href = `tel:${phoneNumber}`;
    }, 300); // Delay for swipe animation
  };

  return (
    <div className="relative h-12 w-72 overflow-hidden rounded-full bg-gray-200">
      <div
        className={`absolute inset-0 flex items-center justify-center bg-green-500 font-bold text-white transition-transform duration-300 ease-in-out ${
          isSwiped ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {isSwiped ? "Calling..." : "Swipe to Call"}
      </div>
      {!isSwiped && (
        <div
          className="absolute bottom-0 left-0 top-0 h-12 w-12 cursor-pointer rounded-full bg-white shadow-md"
          onTouchEnd={handleSwipe}
          onMouseLeave={handleSwipe} // Supports mouse for web users
        ></div>
      )}
    </div>
  );
};

export default SwipeToCallButton;
