import React from "react";

export const ProfilePagePhoto = ({ photo, name }) => {
  return photo ? (
    <img
      src={photo}
      alt={name}
      className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover"
    />
  ) : (
    <div
      className={`flex text-7xl capitalize text-white items-center justify-center rounded-full w-24 h-24 md:w-32 md:h-32 bg-gray-600`}>
      <span>{name.substr(0, 1)}</span>
    </div>
  );
};
