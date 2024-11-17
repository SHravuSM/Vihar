import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("../");
    }, 2000);
  }, []);
  return (
    <div className="h-screen w-full bg-red-500">
      <h1>NotFound</h1>
    </div>
  );
}
