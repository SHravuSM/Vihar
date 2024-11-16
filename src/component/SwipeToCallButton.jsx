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
        <div className="relative w-72 h-12 bg-gray-200 rounded-full overflow-hidden">
            <div
                className={`absolute inset-0 transition-transform duration-300 ease-in-out bg-green-500 flex items-center justify-center text-white font-bold ${
                    isSwiped ? "translate-x-full" : "translate-x-0"
                }`}
            >
                {isSwiped ? "Calling..." : "Swipe to Call"}
            </div>
            {!isSwiped && (
                <div
                    className="absolute left-0 top-0 bottom-0 w-12 h-12 bg-white shadow-md rounded-full cursor-pointer"
                    onTouchEnd={handleSwipe}
                    onMouseLeave={handleSwipe} // Supports mouse for web users
                ></div>
            )}
        </div>
    );
};

export default SwipeToCallButton;