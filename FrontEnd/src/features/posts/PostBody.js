import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikeButton } from "./LikeButton";
import { CommentOnPost } from "./CommentButton";
import { ProfilePhoto } from "../NavBar/ProfilePhoto";
import { PostHeader } from "./PostHeader";

export function PostBody ({ post }) {
  //const { desc, createdDate, likes, image, comments,_id, } = post;
  const { userid: { profilePicture, username, name }, desc, likes, image, comments, _id } = post;
  
  return (
    <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
      <div className="flex pl-2 pt-3">
        <ProfilePhoto photo={profilePicture} name={name} />
        {/** <i class="material-icons">&#xe872;</i> */}
        <div className="pl-1">
          <PostHeader username={username} name={name} />
        </div>
      </div>
      <div>
        {image && <img src={image} alt={image} className="mt-2" />}
        <p className="py-3 px-2">{desc}</p>
      </div>
      <div className="flex justify-end text-gray-700">
        <p className="mr-2">{likes.length} likes</p>
        <p className="mr-2">{comments.length} comments</p>
      </div>
      <div className="flex justify-around mt-1 border-t-2">
        <LikeButton post={post} />
        {/* <CommentOnPost post={post} />
        <Link className="post-buttons" to={`/viewpost/${_id}`}>
          <span className="pl-1 text-base"><i class="material-icons">&#xe0b9;</i></span>
        </Link> */}
        <Link className="post-buttons" to={`/viewpost/${_id}`}>
          <span className="pl-1 text-base"><i class="material-icons">&#xe8f4;</i></span>
        </Link>
      </div>
    </div>
  )
};
