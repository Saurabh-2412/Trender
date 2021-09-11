import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postComment } from "./postSlice";
import { getLocalStorage } from "../authentication/Storage";

//fetching single comment
export function CommentListner({ post }){
    const { userdata } = getLocalStorage();
    //console.log("userdata",userdata);
    //const postedComments = post.comments;
    //console.log("postedComments",postedComments);
    let postComments = post.comments.map((postedElement) => postedElement.userid === userdata.userid);

    return (
        <div>
            { postComments && <p style={{color:"gray"}}>{postComments.comment}</p> }
        </div>
    )
}

export function CommentOnPost({ post }){
    const [ textBox, textBoxSetter ] = useState("none");
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const [pending, setPending] = useState("idle");
    
    function textBoxToggle(){
        if(textBox === "none"){
            textBoxSetter("block");
        } else {
            textBoxSetter("none");
        }
    }

    function handleOnclickHandler (post) {
        dispatch(postComment({ postid: post._id, comment }));
        textBoxSetter("none");
        setComment("");
    };

    return (
        <div>
            <div>
                <button className="post-buttons" onClick={() => textBoxToggle(post)}>
                    <span className="pl-1 text-base"><i class="material-icons">&#xe0b9;</i></span>
                </button>
                <div className="flex items-center flex-col my-2" style={{ display:`${textBox}` }}>
                    <textarea
                    autoFocus={true}
                    className="resize-auto rounded mx-3 my-1 p-1 w-full bg-gray-100 ring"
                    placeholder="Would you like to make a comment?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    >
                    </textarea><br/>
                    <div className="inline items-center mt-2 ml-12">
                        <button
                            className="comment-buttons mr-2 bg-gray-200 w-20 p-1 ring"
                            onClick={() => textBoxToggle()}
                        >Cancel</button>
                        <button
                            className="comment-buttons mr-2 bg-blue-900 w-20 p-1 ring"
                            onClick={() => handleOnclickHandler(post)}
                        >Save</button>
                    </div>
                </div>
            </div>
            <CommentListner post={post}/>
        </div>
    )
}