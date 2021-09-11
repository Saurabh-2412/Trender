import React, { Component, useEffect,useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchAllPosts } from "./postSlice";
import { NewPost } from "./NewPost";
import { orderPostByDate } from "../Utils/OrderedPostByDate";
import { PostBody } from "./PostBody";
import { LikeButton } from "./LikeButton";
import { CommentOnPost } from "./CommentButton";
import { ViewPost } from "./ViewPost";

export const PostList = () => {
  const [status, setStatus] = useState("idle");
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  console.log("posts",posts);
  
  useEffect(() => {
    (async () => {
      try {
        setStatus("pending");
        const result = await dispatch(fetchAllPosts());
        unwrapResult(result);
        setStatus("success");
      } catch (error) {
        console.log(error);
        setStatus("idle");
      }
    })();
  }, [dispatch]);

  const orderedPost = orderPostByDate(posts);

  let renderContent;

  renderContent =
  posts.length === 0 ? (
    <div className="text-center">
      <p className="p-2">No posts found</p>
    </div>
  ) : (
    React.Children.toArray(
      orderedPost?.map((post) => <PostBody post={post} />)
    )
  );

  return (
    <div className="flex items-center flex-col mt-3 mb-5">
      <NewPost />
      {status === "pending" && "Loading..."}
      {status === "success" && renderContent}
    </div>
  );
};