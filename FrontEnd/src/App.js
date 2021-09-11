import React,{ useEffect,useState, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './App.css';
import { PostList } from './features/posts/PostList';
import { ViewPost } from './features/posts/ViewPost';
import { ToastContainer } from "react-toastify";
import { Signup } from "./features/authentication/SignUp";
import { Login } from "./features/authentication/LoginPage";
import { logout, setData } from "./features/authentication/AuthSlice";
import { getLocalStorage } from "./features/authentication/Storage";
import { Navbar } from "./features/NavBar/Navbar";
import { UserProfile } from "./features/user/UserProfile";
import { Following } from './features/user/Following';
import { Followers } from './features/user/Followers';
import { UserPost } from './features/user/UserPost';
import { UserLikedPosts } from './features/user/UserLikedPost';
import { setupAuthHeaderForServiceCalls,setupAuthExceptionHandler } from "./features/authentication/ServiceHandler";
import { SearchModal } from "./features/user/SearchModal";

const useToggle = () => {
  const [state, setState] = useState(false);
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

function App() {
  const [showModal, setShowModal] = useToggle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //console.log("getLocalStorage",getLocalStorage());
  const { userdata, token } = getLocalStorage();
  useEffect(() => {
    if (token) {
      setupAuthHeaderForServiceCalls(token);
      setupAuthExceptionHandler(logout, navigate, dispatch);
      dispatch(setData({ userdata, token }));
    }
  }, [dispatch, navigate, token, userdata]);

  const PrivateRoute = ({ path, ...props }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    //console.log("private routes",token);
    return token ? <Route path={path} {...props} /> : <Navigate to="/login" />;
  };

  /* return (
    <div className="App">
      <Routes>
        {token ? (
          <Navigate path="/" to="/feed" />
        ) : (
          <Navigate path="/" to="/login" />
        )}
        <Route path="/signup" element={ <Signup/> }/>
        <Route path="/login" element={ <Login/> }/>
        <PrivateRoute path="/feed" element={ <PostList/> } />
        <PrivateRoute path="/viewpost/:postid" element={ <ViewPost/> } />

        <PrivateRoute path="/home" element={<PostList />} />
        <PrivateRoute path="/viewpost/:postid" element={<ViewPost/>} />
      </Routes>
      <ToastContainer />
    </div>
  ); */

  return (
    <div className="App">
      <main className="bg-gray-200 min-h-screen overflow-x-auto">
        <Navbar setShowModal={setShowModal} />
        <Routes>
          {token ? (
            <Navigate path="/" to="/feed" />
          ) : (
            <Navigate path="/" to="/login" />
          )}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username" element={ <UserProfile /> }/>
          <PrivateRoute path="/feed" element={<PostList />} />
          <PrivateRoute path="/viewpost/:postid" element={ <ViewPost/> }/>
          <PrivateRoute path="/:username" element={<UserProfile />}>
            {/** <Route path="/" element={<UserPost />} /> */}
            <Route path="/" element={<UserPost />} />
            <Route path="/mylikes" element={<UserLikedPosts />} /> 
            </PrivateRoute>
          <PrivateRoute path="/:username/followers" element={<Followers />} />
          <PrivateRoute path="/:username/following" element={<Following />} />
        </Routes>
        {showModal && <SearchModal setShowModal={setShowModal} />}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;