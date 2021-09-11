import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function Navbar({ setShowModal }){
    const { currentUser, token } = useSelector((state) => state.auth);
    //console.log("currentUser",currentUser);

    return (
        <div className="flex justify-between bg-white p-1 sticky top-0 z-10">
            <div className="flex p-2">
                <p className="text-2xl md:text-3xl font-bold text-gray-500">
                    <Link to="/feed">
                        <i class="material-icons">&#xe8e5;</i>Trender
                    </Link>
                </p>
            </div>
            {token ? (
                <div className="flex space-x-2">
                    <div className="py-2">
                        <i className="material-icons text-4xl text-gray-500 cursor-pointer" onClick={setShowModal}>&#xe8fa;</i>
                    </div>
                    <Link to={`${currentUser?.username}`}>
                        <div className="flex items-center space-x-1 rounded-full mt-2 pr-2 mr-2 md:mr-4">
                        {currentUser?.profilePicture ? (
                            <img
                                src={currentUser?.profilePicture}
                                alt=""
                                className="rounded-full w-9 h-9 object-cover"
                            />
                        ) : (
                            <div>
                                <div
                                    className={`flex text-1xl text-white items-center justify-center rounded-full w-9 h-9 bg-pink-600`}>
                                    <div>{currentUser?.name.substr(0, 1).toUpperCase()}</div>
                                </div>
                            </div>
                        )}
                        </div>
                    </Link>
                </div>
                ) : (
                    <Link
                    to="/login"
                    className="flex items-center rounded-full mt-1 4 mr-2 md:mr-4 text-">
                    <i class="material-icons">&#xe879;</i>
                    </Link>
                )
            }
        </div>
    );
}

/* 
    return (
        <nav>
            <Link to="/feed" style={{padding:"15px", border:"5px"}}>PostFeed</Link>
            <Link to="/login" style={{padding:"15px", border:"5px"}}>Login</Link>
            <Link to="/signup" style={{padding:"15px", border:"5px"}}>SignUp</Link>
            <Link to={`${currentUser?.username}`} style={{padding:"15px", border:"5px"}}>

                <div className="flex items-center space-x-1 bg-gray-200 rounded-full mt-2 pr-2 mr-2 md:mr-4">
                    {currentUser?.profilePicture ? (
                        <img
                            src={currentUser?.profilePicture}
                            alt="me"
                            className="rounded-full w-9 h-9 object-cover"
                        />
                    ) : (
                        <div>
                            <div
                                className={`flex text-1xl text-white items-center justify-center rounded-full w-9 h-9 bg-pink-600`}>
                                <span>{currentUser?.name[0]}</span>
                            </div>
                        </div>
                    )}
                    <div>{currentUser?.name}</div>
                </div>
            </Link>
            already commented><Link to="/viewpost/:postid" style={{padding:"15px", border:"5px"}}>ViewPost</Link>
        </nav>
    );
*/