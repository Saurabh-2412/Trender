import React from "react";
import axios from "axios";
import { toastError } from "../Utils/ToastMessages";

export const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const setupAuthExceptionHandler = (logout, navigate, dispatch) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        dispatch(logout());
        navigate("login");
        toastError("Token expired,please login again");
      }
      return Promise.reject(error);
    }
  );
};