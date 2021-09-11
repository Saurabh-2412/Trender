import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PostHeader } from "../posts/PostHeader";
import { searchUserClicked } from "../user/userSlice";
import { toastError } from "../Utils/ToastMessages";
import { ProfilePagePhoto } from "./ProfilePhoto";

export const SearchModal = ({ setShowModal }) => {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState("idle");
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
  
    const canSave = Boolean(input);
  
    const onPressEnter = (e) => {
      if (e.key === "Enter") {
        handleClick();
      }
    };
  
    const handleClick = () => {
      (async () => {
        try {
          setStatus("pending");
          const result = await dispatch(searchUserClicked(input.toLowerCase()));
          unwrapResult(result);
          if (result.meta.requestStatus === "fulfilled") {
            setUsers(result.payload);
            setStatus("success");
          }
        } catch (error) {
          console.log(error);
          toastError("something went wrong");
        }
      })();
    };
  
    const renderUsers =
    status === "success" && users.length === 0 ? (
      <div className="text-center">
        <p className="p-2">No user Found</p>
      </div>
    ) : (
      React.Children.toArray(
        users?.map((user) => (
          <div className="flex items-center space-x-1">
            <ProfilePagePhoto photo={user.profilePicture} name={user.name} />
            <div onClick={setShowModal}>
              <PostHeader username={user.username} name={user.name} />
            </div>
          </div>
        ))
      )
    );
  
    return (
      <div className="min-w-screen h-screen fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 ">
        <div
        className="absolute bg-black opacity-80 inset-0 z-0"
        onClick={() => setShowModal(false)}></div>
        <div className=" max-w-lg w-11/12 h-3/5 overflow-auto px-3 pb-3 relative mx-auto my-auto rounded shadow-lg bg-white ">
          <div className="space-y-4">
            <div className="sticky top-0 z-1 pb-2 bg-white">
              <div className="text-right p-1">
                <button
                onClick={setShowModal}
                className="md:mb-0 bg-white p-1 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:bg-gray-100">
                Cancel
                </button>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer ">
                <input
                type="text"
                autoFocus={true}
                className="text ring rounded-full text-1xl p-1 w-full"
                placeholder="Search for a user"
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={onPressEnter}
                />
                <button
                onClick={handleClick}
                disabled={!canSave}
                className="focus:text-green-500">
                <i className="material-icons text-4xl text-gray-500 cursor-pointer">&#xe8fa;</i>
                </button>
              </div>
            </div>
            {renderUsers}
          </div>
        </div>
      </div>
    );
};
  