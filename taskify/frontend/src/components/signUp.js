import React, { useState } from "react";
import './styles/signUp.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch

import { authActions } from "../store/authSlice";

function SignUp() {
  const [action, setAction] = useState("Sign Up");
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  // Submit handler
  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("https://mern-stack-task-manager-app-1.onrender.com/api/v1/sign-up", Data);
        
        setData({ username: "", email: "", password: "" });
        alert("User registered successfully");
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
     
        dispatch(authActions.login());
        navigate("/home"); 
      }
    } catch (error) {
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src="./img/icons8-person-24.png" alt="person icon" />
          <input
            type="text"
            name="username"
            placeholder="Name"
            required
            value={Data.username}
            onChange={change}
          />
        </div>

        <div className="input">
          <img src="./img/icons8-email-30.png" alt="email icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={Data.email}
            onChange={change}
          />
        </div>

        <div className="input">
          <img id="password" src="./img/icons8-password-50.png" alt="password icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={Data.password}
            onChange={change}
          />
        </div>
      </div>

      <div className="submit-container">
        <button onClick={submit} className="submit">Sign Up</button>
      </div>

      <div className="forgot-passwordd">
        Already have an account? <Link to="/signIn" className="login-link">Login here</Link>
      </div>
    </div>
  );
}

export default SignUp;
