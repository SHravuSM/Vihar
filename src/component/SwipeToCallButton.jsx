// import React, { useState } from "react";

// const SwipeToCallButton = ({ phoneNumber }) => {
//   const [isSwiped, setIsSwiped] = useState(false);

//   const handleSwipe = () => {
//     setIsSwiped(true);
//     setTimeout(() => {
//       window.location.href = `tel:${phoneNumber}`;
//     }, 300); // Delay for swipe animation
//   };

//   return (
//     <div className="relative h-12 w-72 overflow-hidden rounded-full bg-gray-200">
//       <div
//         className={`absolute inset-0 flex items-center justify-center bg-green-500 font-bold text-white transition-transform duration-300 ease-in-out ${
//           isSwiped ? "translate-x-full" : "translate-x-0"
//         }`}
//       >
//         {isSwiped ? "Calling..." : "Swipe to Call"}
//       </div>
//       {!isSwiped && (
//         <div
//           className="absolute bottom-0 left-0 top-0 h-12 w-12 cursor-pointer rounded-full bg-white shadow-md"
//           onTouchEnd={handleSwipe}
//           onMouseLeave={handleSwipe} // Supports mouse for web users
//         ></div>
//       )}
//     </div>
//   );
// };

// export default SwipeToCallButton;


import React, { useState } from "react";

const SwipeToCallButton = ({ phoneNumber }) => {
  const [startX, setStartX] = useState(0); // Start position of the swipe
  const [currentX, setCurrentX] = useState(0); // Current position of the swipe
  const [isSwiped, setIsSwiped] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const touchX = e.touches[0].clientX;
    if (touchX > startX) {
      setCurrentX(touchX);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    // Check if swipe is complete (e.g., 80% of the container width)
    const containerWidth = 288; // Width of the button (e.g., 72rem in Tailwind)
    const swipeDistance = currentX - startX;
    if (swipeDistance > containerWidth * 0.8) {
      setIsSwiped(true);
      setTimeout(() => {
        window.location.href = `tel:${phoneNumber}`;
      }, 300); // Delay for visual feedback
    } else {
      // Reset swipe if not complete
      setCurrentX(startX);
    }
  };

  const progress = Math.min(currentX - startX, 288); // Limit swipe progress to container width

  return (
    <div className="relative h-12 w-72 overflow-hidden rounded-full bg-gray-200 shadow-lg">
      {/* Swipe progress */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-white font-semibold transition-transform duration-300 ease-in-out ${isSwiped ? "bg-green-600 translate-x-full" : "bg-blue-500"
          }`}
        style={{
          transform: isSwiped ? "translateX(100%)" : "none",
        }}
      >
        {isSwiped ? "Calling..." : "Swipe to Call"}
      </div>

      {/* Swipe handle */}
      {!isSwiped && (
        <div
          className="absolute bottom-0 left-0 top-0 h-12 w-12 cursor-pointer rounded-full bg-white shadow-md transition-transform ease-in-out"
          style={{
            transform: `translateX(${progress}px)`,
            transition: isSwiping ? "none" : "transform 300ms ease-in-out",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        ></div>
      )}
    </div>
  );
};

export default SwipeToCallButton;
