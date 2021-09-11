import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { LikeButton } from "./LikeButton";
import { CommentOnPost } from "./CommentButton";
import { deletePost, editPost } from "./postSlice";
import { EditPost } from "./EditPost";

export function Posts ({ post }) {
    const [showEditModal, setshowEditModal] = useState(false);
    const { desc, likes, image, comments, _id } = post;
    const { token } = useSelector((state) => state.auth);
    const [status, setStatus] = useState("idle");
    const dispatch = useDispatch();

    function EditingPost(postid){
        //dispatch(editPost({ postid: postid }));
        setshowEditModal(true);
    }

    async function DeletingPost(postid){
        try {
            const result = await dispatch(deletePost({ postid: postid }));
            unwrapResult(result);
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
        <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
            <div>
                {image && <img src={image} alt={image} className="mt-2" />}
                <p className="py-3 px-2">{desc}</p>
            </div>
            <div className="flex justify-end text-gray-700">
                <p className="mr-2">{likes.length} likes</p>
                <p className="mr-2">{comments.length} comments</p>
            </div>
            <div className="flex justify-around my-1 border-t-2">
                {/** <LikeButton post={post} /> */}
                {/** <CommentOnPost post={post} /> */}
                <Link className="post-buttons" to={`/viewpost/${_id}`}>
                    <span className="pl-1 text-base"><i class="material-icons">&#xe8f4;</i></span>
                </Link>
                <button onClick={EditingPost}>
                    <i class="material-icons">&#xe254;</i>
                </button>
                {showEditModal && (
                    <EditPost setshowEditModal={setshowEditModal} post={post}/>
                )}
                <button onClick={() => DeletingPost(_id)}>
                    <i class="material-icons">&#xe872;</i>
                </button>
            </div>
        </div>
    )
};
