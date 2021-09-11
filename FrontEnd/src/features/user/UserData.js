import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserData = ({ user }) => {
    const { posts } = useSelector((state) => state.posts);

    return (
        <div className="ml-2">
            <div className="p-1">
                <p style={{textAlign:"left",fontStyle:"italic",fontWeight:"700",marginLeft:"3.5px"}}>...{user.bio}</p>
            </div>
            <div className="flex text-gray-500 mt-1">
                {user.location && (
                    <div className="flex items-center">
                        <i class="material-icons">&#xe55f;</i><span className="">{user.location}</span>
                    </div>
                )}
                {user.url && (
                    <div className="flex ml-2 items-center">
                        <i class="material-icons">&#xe894;</i>
                        <a
                        href={`https://${user.url}`}
                        className="pl-1"
                        target="_blank"
                        rel="noreferrer">
                        {user.url}
                        </a>
                    </div>
                )}
            </div>
            <div className="flex text-gray-600 mt-1 ml-1">
                <div>
                    <span className="font-bold">{posts?.length}</span>
                    <span className="pl-1">post</span>
                </div>
                <Link to="following" className="ml-2">
                    <span className="font-bold">{user.following.length}</span>
                    <span className="pl-1">following</span>
                </Link>
                <Link to="followers" className="ml-2">
                    <span className="font-bold">{user.followers.length}</span>
                    <span className="pl-1">followers</span>
                </Link>
            </div>
        </div>
    );
};
