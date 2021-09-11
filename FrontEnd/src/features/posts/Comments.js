import React, { useState } from "react";
import { dropComment } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";
import { ProfilePhoto } from "../NavBar/ProfilePhoto";
import { PostHeader } from "./PostHeader";
import { getLocalStorage } from "../authentication/Storage";

export function Comments({ comments }){
    console.log("post comments",comments);
    const [ deleteComment,setDeleteComment ] = useState(false);
    const { userdata } = getLocalStorage();
    const dispatch = useDispatch();

    function deleteCommentAction(itemId,postId){
        //console.log(itemId,postId);
        dispatch(dropComment({ postid: postId }));
    }

    const renderComments = React.Children.toArray(
        comments.map((item) => (
          <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
            <div className="flex pl-2 pt-3">
              <ProfilePhoto
                photo={item.userid.profilePicture}
                name={item.userid.name}
              />
              <div className="pl-3">
                <PostHeader
                  username={item.userid.username}
                  name={item.userid.name}
                />
              </div>
            </div>
            <div>
              <p className="py-3 px-2">{item.comment}</p>
            </div>
          </div>
        ))
    );

    return(
        <>
            {renderComments}
        </>
    )
}