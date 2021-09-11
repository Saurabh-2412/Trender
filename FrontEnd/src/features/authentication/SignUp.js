import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toastError, toastWarning } from "../Utils/ToastMessages";
import { userRegisteration } from "./AuthSlice";

export const Signup = () => {
    const [values, setValues] = useState({
        email: "",
        name: "",
        username: "",
        password: "",
        confirm_password: "",
    });
    
    const [ password,setPassword ] = useState("password");
    const [ confPass,setConfPass ] = useState("password");
    const [requestStatus, setRequestStatus] = useState("idle");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    const clickSubmitHandler = (e) => {
        e.preventDefault();
        if (values.password !== values.confirm_password) {
            toastWarning("Password No not match");
        } else {
            formSumbit();
        }
    };

    const formSumbit = async () => {
        try {
            setRequestStatus("pending");
            const result = await dispatch(
                userRegisteration({
                    ...values,
                    username: values.username.toLowerCase().trim(),
                })
            );
            unwrapResult(result);
            setValues({
                email: "",
                name: "",
                username: "",
                password: "",
                confirm_password: "",
            });
        } catch (error) {
            if (error.status === 409) {
                toastError("User Already Exists");
            }
        } finally {
            setRequestStatus("idle");
        }
    };

    const TogglePassword = () => {
        setPassword(password === "password" ? "text" : "password");
    }

    const ToggleConfirmPassword = () => {
        setConfPass(confPass === "password" ? "text" : "password");
    }

    return (
        <div className="bg-grey-lighter mt-4">
            <div className="container max-w-sm mx-auto px-2">
                <form
                onSubmit={clickSubmitHandler}
                className="bg-white px-6 py-6 rounded shadow-md text-black w-full">
                    <h1 className="mb-5 text-3xl text-center">Create a new account..!</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4 "
                        autoFocus={true}
                        name="name"
                        required
                        placeholder="Please enter your fullname"
                        value={values.name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4 "
                        name="username"
                        required
                        placeholder="Please enter username"
                        value={values.username}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
                        name="email"
                        required
                        placeholder="Please enter E-mail"
                        value={values.email}
                        onChange={handleChange}
                    />

                    <div className="flex items-center mx-1 mb-2">
                        <input
                            type={password}
                            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
                            name="password"
                            required
                            placeholder="Please enter password"
                            value={values.password}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            onChange={handleChange}
                        />
                        <input type="checkbox" className="mx-2.5 my-4 h-4 mb-7" onChange={TogglePassword}/>
                    </div>

                    <div className="flex items-center mx-1 mb-2">
                        <input
                            type={confPass}
                            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
                            name="confirm_password"
                            required
                            value={values.confirm_password}
                            title="Please enter password"
                            placeholder="Please re enter your password"
                            onChange={handleChange}
                        />
                        <input type="checkbox" className="mx-2.5 my-4 h-4 mb-7" onChange={ToggleConfirmPassword}/>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring my-1">
                        {requestStatus === "pending" ? "Loading..." : "Create Account"}
                    </button>

                    <div className="text-grey-dark mt-3 text-center">
                        Already have an account?
                        <Link to="/login" className=" border-b border-blue text-blue">Login</Link>
                    </div>

                </form>
            </div>
        </div>
    );
};
