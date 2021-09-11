import React from "react";

export const ProfilePhoto = ({ photo, name }) => {
  return photo ? (
    <img
      src={photo}
      alt={name}
      className="rounded-full w-12 h-12 object-cover"
    />
  ) : (
    <div
      className={`text-white items-center capitalize justify-center rounded-full w-12 h-12 bg-pink-600`}>
      <span>{name?.substr(0, 1)}</span>
    </div>
  );
};
