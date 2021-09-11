import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../authentication/AuthSlice";
import { editPost } from "./postSlice";
import { PostPhoto } from "./PostPhoto";

export const EditPost = ({ setshowEditModal, post }) => {
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const [postid,setPostId] = useState(post._id);

    const [values, setValues] = useState({
        desc: post.desc,
        image: post.image
    });

    const handleChange = (e) => {
        console.log("handling change",e.target.value);
        setValues((values) => ({
            ...values,
            [e.target.desc]: e.target.value,
        }));
        setDesc(e.target.value);
    };

    const addImage = (event) => {
        setImage(event.target.files[0]);
        event.target.value = "";
    };

    const removeImage = () => {
        setImage("");
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(editPost({ postid, desc, image }));
            unwrapResult(result);
            setshowEditModal(false);
            setImage("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed flex  inset-0 z-50 outline-none focus:outline-none ">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <form
            onSubmit={handleFormSubmit}
            className=" max-w-lg w-11/12 md:w-full p-5 relative mx-auto my-auto rounded shadow-lg bg-white ">
                <h1 className="text-2xl font-bold mb-1 text-left">Edit post</h1>
                <PostPhoto photo={post.image} />
                <div className="space-y-3">
                    <div className="flex">
                      <div className="flex items-right">
                          <label
                          htmlFor="file"
                          className="flex cursor-pointer items-center rounded p-2  font-medium  hover:bg-gray-100">
                              <span className="text-gray-700">Change Photo</span>
                              <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className="hidden" onChange={addImage}/>
                          </label>
                          {image && (
                            <span>
                              <button
                              className="text-2xl cursor-pointer"
                              onClick={removeImage}
                              title="Remove image"
                              ><i class="material-icons">&#xe872;</i></button>
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="space-y-2">
                        <div style={{float:"left"}}>Description</div>
                        <textarea
                        type="text"
                        className="p-1 rounded font-semibold ring-2 focus:ring-3 w-full"
                        defaultValue={values.desc}
                        onChange={handleChange}
                        name="desc"
                        id="desc"></textarea>
                    </div>
                </div>
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                    <button
                        onClick={() => setshowEditModal(false)}
                        className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                        Cancel
                    </button>
                    <button className="mb-2 md:mb-0 bg-blue-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};
