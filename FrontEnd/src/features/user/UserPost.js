import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostBody } from "../../features/posts/PostBody";
import { getUserPost } from "../../features/posts/postSlice";
import { orderPostByDate } from "../../features/Utils/OrderedPostByDate";
import { toastError } from "../../features/Utils/ToastMessages";
import { Posts } from "../posts/Posts";

export const UserPost = () => {
  const [status, setStatus] = useState("idle");
  const { user } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.auth);
  const orderedPost = orderPostByDate(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setStatus("pending");
          const result = await dispatch(getUserPost(user._id));
          unwrapResult(result);
          setStatus("success");
        } catch (error) {
          console.log(error);
          toastError("Something went wrong, cannot load post");
          setStatus("idle");
        }
      })();
    }
  }, [dispatch, user._id, token]);

  let renderContent =
  posts?.length === 0 ? (
    <div className="text-center">
      <p className="p-2">No posts Found</p>
    </div>
  ) : (
    React.Children.toArray(
      orderedPost?.map((post) => <Posts post={post} />)
    )
  );

  return <>{status === "success" && renderContent}</>;
};
