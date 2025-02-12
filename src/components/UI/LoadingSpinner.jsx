import React from "react";

const LoadingSpinner = ({ color = "white" }) => {
  return <div className={`animate-spin rounded-full h-5 w-5 border-2 border-${color} border-t-transparent`}></div>;
};

export default LoadingSpinner;
