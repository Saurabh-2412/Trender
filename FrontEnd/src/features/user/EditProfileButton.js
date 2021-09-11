import React from "react";

export const EditProfileButton = ({ setshowEditModal }) => {
  return (
    <button className="edit-button ring rounded mb-3 p-0.5" onClick={() => setshowEditModal(true)}>
      Edit Profile
    </button>
  );
};
