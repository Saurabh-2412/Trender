import React,{useEffect,useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { viewPost } from "./postSlice";
import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import { Link, useParams } from "react-router-dom";
import { postComment } from "./postSlice";
import { ProfilePhoto } from "../NavBar/ProfilePhoto";
import { PostHeader } from "../posts/PostHeader";

export function ViewPost() {
    const [pending, setPending] = useState("idle");
    const { postid } = useParams();
    const [showBox, setShowBox] = useState(false);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const canPost = Boolean(comment);
    const post = useSelector((state) => state.posts.singlePost);

    const handleOnclickHandler = (post) => {
        dispatch(postComment({ postid: post._id, comment }));
        setShowBox(false);
        setComment("");
    };

    useEffect(() => {
         (async () => {
            try {
                setPending("pending");
                const resultAction = await dispatch(viewPost(postid));
                unwrapResult(resultAction);
                setPending("success");
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch, postid] );

    const renderSinglePost = (
        <>
            {pending === "success" && (
                <div className="flex items-center flex-col mt-3 mb-10">
                    <div className="bg-white mt-3 w-full md:max-w-lg rounded shadow">
                        <div className="mx-2 py-1 border-b-2">
                            <Link
                                to="/feed"
                                className="flex items-center text-2xl font-bold ">
                                <i class="material-icons">&#xe5c4;</i><span>Feed</span>
                            </Link>
                        </div>
                        <div className="flex pl-2 pt-3">
                            <ProfilePhoto
                                photo={post.userid.profilePicture}
                                name={post.userid.name}
                            />
                            <div className="pl-3">
                                <PostHeader
                                username={post.userid.username}
                                name={post.userid.name}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="py-3 px-2">{post.desc}</p>
                            {post.image && (
                                <img src={post.image} alt="name" className="mt-2 p-1 md:p-0" />
                            )}
                        </div>
                        <div className="flex justify-end my-2 text-gray-700">
                            <p className="mr-2">{post.likes.length} likes</p>
                            <p className="mr-2">{post.comments.length} comments</p>
                        </div>
                        <div className="flex justify-around my-1 border-t-2">
                            <LikeButton post={post} type="single" />
                            <button className="post-buttons" onClick={() => setShowBox(true)}>
                                <span className="pl-1 text-base"><i class="material-icons">&#xe0b9;</i></span>
                            </button>
                        </div>
                        {showBox && (
                            <div className="flex items-center flex-col my-3">
                                <textarea
                                autoFocus={true}
                                className="w-11/12 md:w-11/12 bg-gray-200 rounded-lg p-2"
                                coloums="40"
                                placeholder="Would you like to make a comment?"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}></textarea>
                                <div className="inline items-center mr-3 mt-2">
                                    <button
                                        className="comment-buttons mr-2 bg-gray-200 w-20 p-1 ring"
                                        onClick={() => setShowBox(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="comment-buttons mr-2 bg-blue-900 w-20 p-1 ring"
                                        onClick={() => handleOnclickHandler(post)}
                                        disabled={!canPost}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                <Comments comments={post.comments} />
                </div>
            )}
        </>
    );

    return (
        <section>
            {renderSinglePost}
            <div className="text-center">
                <p> {pending === "pending" && "Loading..."}</p>
            </div>
        </section>
    )
}
