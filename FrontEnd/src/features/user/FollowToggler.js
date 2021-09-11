import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "./userSlice";

export const FollowToggle = ({ user }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userConnection = () => {
    if (user?.followers.includes(currentUser?.userid)) {
      dispatch(unFollow(user._id));
    } else {
      dispatch(follow(user._id));
    }
  };

  const buttonToggle = () => {
    if (user?.followers.includes(currentUser?.userid)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <button onClick={userConnection} className="follow-button flex items-center ring rounded mb-3 p-0.5">
      {buttonToggle() ? <i class="material-icons">&#xe7f0;</i> : <i class="material-icons">&#xe7fd;</i>}
    </button>
  );
};
