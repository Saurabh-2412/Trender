import React from "react";
import { Link } from "react-router-dom";

export const PostHeader = ({ username, name }) => {
  return (
    <>
      <div className="flex items-center">
        <Link to={`/${username}`} className="font-medium font-bold">
          {name}
        </Link>
        <br/>
      </div>
      <div className="flex items-center">
        <Link
        to={`/${username}`}
        className="text-sm text-gray-400 font-semibold ">
        @{username}
        </Link>
      </div>
    </>
  );
};
