import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postSlice';
import { PostList } from "./PostList";
import { createPost } from "./postSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export function NewPost(){
  const dispatch = useDispatch();
  const [ content, setContent ] = useState('');
  const [ status, setState ] = useState("idle");
  const [ image, setImage ] = useState("");
  const onContentChanged = e => setContent(e.target.value);
  const canSave = Boolean(content) || Boolean(image);
  
  const onSubmitHandler = async () => {
    try {
      setState("pending");
      const result = await dispatch(createPost({ content, image }));
      unwrapResult(result);
      setContent("");
      setImage("");
      setState("success");
    } catch (error) {
      console.log(error);
      setState("idle");
    }
  };

  const addImage = (event) => {
    setImage(event.target.files[0]);
    event.target.value = "";
  };

  const removeImage = () => {
    setImage("");
  };

  return (
    <div className="input-box bg-white pt-3 mb-5 w-full md:max-w-lg rounded shadow">
      <div className="flex pl-2 py-3x">
        <textarea
          className="resize-auto rounded mx-3 my-1 p-1 w-full bg-gray-100"
          placeholder="what do you have in mind?"
          value={content}
          onChange={onContentChanged}></textarea>
      </div>
      <div className="flex justify-between mb-2 mt-2">
        <div className="flex items-center">
          <label
            htmlFor="file"
            className="flex cursor-pointer items-center rounded p-2 ml-5 font-medium  hover:bg-gray-100">
            <i class="material-icons text-gray-700 mr-2.5">&#xe251;</i>
            <span className="text-gray-700">Add Photo</span>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={addImage}
            />
          </label>
          {image && (
            <span
              className="text-2xl cursor-pointer"
              onClick={removeImage}
              title="Remove image"
            ><i class="material-icons">&#xe872;</i></span>
          )}
        </div>

        <button
          className=" mr-3 md:mr-5 px-8 bg-blue-500 text-white ring rounded-full hover:bg-blue-700 hover:shadow"
          disabled={!canSave}
          onClick={onSubmitHandler}>
          {status === "pending" ? "wait..." : "Post"}
        </button>
      </div>
    </div>
  )
}