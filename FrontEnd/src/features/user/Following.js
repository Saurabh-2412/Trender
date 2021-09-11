import React, { useEffect } from "react";
//import { TiArrowBack } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { ProfilePagePhoto } from "./ProfilePhoto";
import { PostHeader } from "../posts/PostHeader";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing, selectUserById } from "./userSlice";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { toastError } from "../Utils/ToastMessages";

export const Following = () => {
  const { username } = useParams();
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();
  const { following } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setStatus("pending");
          const result = await dispatch(getFollowing(username));
          unwrapResult(result);
          setStatus("success");
        } catch (error) {
          console.log(error);
          toastError("Something went wrong, cannot load post");
          setStatus("idle");
        }
      })();
    }
  }, [dispatch, username, token]);

  const renderFollowing =
    following.length === 0 ? (
      <div className="text-center">
        <p className="p-2">You are not following anyone</p>
      </div>
    ) : (
      React.Children.toArray(
        following?.map((user) => (
          <div className="flex pl-2 pt-3 ">
            <ProfilePagePhoto photo={user.profilePicture} name={user.name} />
            <div className="pl-3 pt-2">
              <PostHeader username={user.username} name={user.name} />
            </div>
          </div>
        ))
      )
    );

    return (
      <div className="flex items-center flex-col mt-3 mb-10">
          <div className="bg-white mt-1 p-3 md:p-3 md:p-0 w-full md:w-1/2 rounded shadow">
              <div className="mx-2 py-1 border-b-2">
                  <Link
                      to={`/${username}`}
                      className="flex items-center text-2xl font-bold ">
                      {/** <TiArrowBack /> */}
                      <span>Back</span>
                  </Link>
              </div>
              {status === "success" && renderFollowing}
          </div>
      </div>
    );
};
