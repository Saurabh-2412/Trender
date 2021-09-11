import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostBody } from "../posts/PostBody";
import { orderPostByDate } from "../Utils/OrderedPostByDate";
import { unwrapResult } from "@reduxjs/toolkit";
import { toastError } from "../Utils/ToastMessages";
import { getAllLikedPost } from "../posts/postSlice";

export const UserLikedPosts = () => {
    const [status, setStatus] = useState("idle");
    const { user } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    setStatus("pending");
                    const result = await dispatch(getAllLikedPost(user._id));
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

    const orderedPost = orderPostByDate(posts);
    let renderContent;

    renderContent =
        posts.length === 0 ? (
            <div className="text-center">
                <p className="p-2">No posts Liked yet</p>
            </div>
            ) : (
            React.Children.toArray(
                orderedPost?.map((post) => <PostBody post={post} />)
            )
        );

    return <>{status === "success" && renderContent}</>;
};
