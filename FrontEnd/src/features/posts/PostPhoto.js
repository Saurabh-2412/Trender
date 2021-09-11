import React from "react";

export const PostPhoto = ({ photo }) => {
  return photo ? (
    <img
      src={photo}
      alt={photo}
      className="w-full h-15 md:w-75 md:h-15 object-cover"
    />
  ) : (
    <div
      className={`flex capitalize text-white items-center justify-center rounded-full w-full h-45 md:w-75 md:h-45 object-cover bg-gray-500`}>
      <span>No image attached</span>
    </div>
  );
};
