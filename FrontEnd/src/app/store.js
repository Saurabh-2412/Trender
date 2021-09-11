import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/posts/postSlice';
import authReducer from "../features/authentication/AuthSlice";
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    auth: authReducer,
    user: userReducer
  },
});
