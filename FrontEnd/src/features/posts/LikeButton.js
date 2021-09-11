import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, likeSinglePost, unlikePost, unLikeSinglePost } from "./postSlice";

export function LikeButton({ post, type }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const likeColorToggle = (post) => {
    if (post?.likes.includes(currentUser.userid)) {
      return "text-blue-500";
    } else {
      return "";
    }
  };

  const likeButtonHandler = (post) => {
    if (post?.likes.includes(currentUser.userid)) {
      if (type === "single") {
        dispatch(unLikeSinglePost(post._id));
      } else {
        dispatch(unlikePost(post._id));
      }
    } else {
      if (type === "single") {
        dispatch(likeSinglePost(post._id));
      } else {
        dispatch(likePost(post._id));
      }
    }
  };

  return (
    <button
      onClick={() => likeButtonHandler(post, currentUser)}
      className={`post-buttons ${likeColorToggle(
        post,
        dispatch,
        currentUser
      )}`}><i class="material-icons">&#xe8dc;</i>
    </button>
  )
}