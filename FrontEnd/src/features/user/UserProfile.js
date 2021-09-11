import React,{ useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import { fetchUser } from "./userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { EditProfileButton } from "./EditProfileButton";
import { Logout } from "./LogoutButton";
import { ProfilePagePhoto } from "./ProfilePhoto";
import { UserData } from "./UserData"
import { EditProfile } from "./EditProfile";
import { FollowToggle } from "./FollowToggler";

export const UserProfile = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { token, currentUser } = useSelector((state) => state.auth);
    const [showEditModal, setshowEditModal] = useState(false);
    const [status, setStatus] = useState("idle");

    const checkExistingUser = (currentUser, randomUser) => {
        return currentUser === randomUser;
    };

    const renderLogout = checkExistingUser(currentUser.userid, user._id) && ( <Logout /> );

    const renderEditButton = checkExistingUser(currentUser.userid, user._id) && ( <EditProfileButton setshowEditModal={setshowEditModal} />);

    const renderFollowButton = checkExistingUser( currentUser.userid, user._id ) || <FollowToggle user={user} />;

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    setStatus("pending");
                    const result = await dispatch(fetchUser(username));
                    unwrapResult(result);
                    setStatus("success");
                } catch (error) {
                    console.log(error);
                    setStatus("idle");
                }
            })();
        }
    }, [dispatch, username, token]);

    const renderUserProfile = status === "success" && (
        <div className="bg-white mt-1 p-2 w-full md:p-0 md:w-2/5 rounded shadow">
            <div className=" justify-between mx-2 py-1 border-b-2">
                <Link to="/feed" className="flex items-center text-2xl font-bold ">
                    <i class="material-icons">&#xe5c4;</i><span>Feed</span>
                </Link>
            </div>
            <div className="flex relative  p-2 md:p-3">
                <ProfilePagePhoto photo={user.profilePicture} name={user.name} />
                <div className=" pl-3 mt-2">
                    <p className=" font-extrabold text-base md:text-3xl capitalize">
                        {user.name}
                    </p>
                    <p className="font-bold text-gray-500 text-base md:text-2xl ">
                        @{user.username}
                    </p>
                    <div className="flex mt-2">
                        <div>{renderEditButton}</div>
                    </div>
                </div>
                <div className="absolute right-0 top-3 md:top-4  md:mr-5">
                    {renderLogout}
                </div>
                <div className="absolute right-0 top-3 md:top-4 md:mr-5">
                    {renderFollowButton}
                </div>
            </div>
            <UserData user={user} />
            <div className="flex justify-around my-1 border-t-2">
                <NavLink to={`/${username}`} className="post-buttons">
                    <i className="material-icons pl-1 text-base">&#xe5c3;</i>
                    <span className="pl-1 text-base"> My Posts</span>
                </NavLink>
                <NavLink to="mylikes" className="post-buttons">
                    <i class="material-icons pl-1 text-base">&#xe8dc;</i>
                    <span className="pl-1 text-base">Likes</span>
                </NavLink>
            </div>
            <div className="flex items-center flex-col mt-3 mb-5">
                <Outlet />
            </div>
        </div>
    );

    return (
        <div className="flex items-center flex-col">
            {status === "success" && renderUserProfile}
            {status === "pending" && <p className="text-2xl mt-4">Loading...</p>}
            {showEditModal && (
                <EditProfile setshowEditModal={setshowEditModal} user={user} />
            )}
        </div>
    );
};
