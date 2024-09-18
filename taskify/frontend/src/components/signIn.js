import React, { useState } from "react";
import './styles/signUp.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import axios from "axios";
import { authActions } from "../store/authSlice";

function SignIn() {
  const [action, setAction] = useState("Login");
  const [Data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://mern-stack-task-manager-app-1.onrender.com/api/v1/log-in",
          Data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, 
          }
        );
  
        // If login is successful
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/home");
      }
    } catch (error) {
      // If server returns an error, catch and handle it
      if (error.response && error.response.data) {
        const serverMessage = error.response.data.message;
  
        // Display specific server-side error messages
        if (serverMessage === "please enter correct username") {
          alert("Incorrect username, please try again.");
        } else if (serverMessage === "incorrect password") {
          alert("Incorrect password, please try again.");
        } else {
          alert(serverMessage); // Default: Display whatever message the server sends
        }
      } else {
        // Handle unexpected errors
        alert("An error occurred during login");
      }
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
            placeholder="Username"
            required
            value={Data.username}
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
        <button className="submit" onClick={submit}>Login</button>
      </div>
      <div className="forgot-password">
        Lost Password? <a href="./ForgotPassword"><span>Click here</span></a>
      </div>

      <div className="forgot-password">
        Not having an account? <Link to="/signUp" className="signup-link">Sign Up here</Link>
      </div>
    </div>
  );
}

export default SignIn;
