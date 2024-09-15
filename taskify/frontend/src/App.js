import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from './store/authSlice';
import Home from './components/home';
import Important from './components/important';
import Incompleted from './components/incompleted';
import Completed from './components/completed';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import UpdateProfile from './components/updateProfile'; 
import ForgotPassword from './components/ForgotPassword';

function App() {
  const navigate = useNavigate(); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

 /* React.useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (userId && token) {
      dispatch(authActions.login());
      navigate("/"); // Redirect to home if logged in
    } else {
      navigate("/signUp"); // Redirect to sign-in if not logged in
    }
  }, [dispatch, navigate]);
  
  
  // Ensure navigation only happens if not logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);*/
  
// useEffect(()=> {
//   if(localStorage.getItem("id") && localStorage.getItem("token")){
//     dispatch(authActions.login());
//   } else if(isLoggedIn === false){
//     navigate("/signUp");}
//   },[]);

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/important" element={<Important />} />
      <Route path="/home" element={<Home />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/incompleted" element={<Incompleted />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/updateProfile" element={<UpdateProfile />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
