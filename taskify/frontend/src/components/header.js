import React from 'react';
import './styles/header.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/signUp");
  };

  const updateProfile = () => {
    navigate("/updateProfile"); 
  };
  const allTask = () => {
    navigate("/home"); 
  };
  const important = () => {
    navigate("/important"); 
  };
  const completed = () => {
    navigate("/completed"); 
  };
  const incompleted = () => {
    navigate("/incompleted"); 
  };

  return (
    <header className="header">
      <nav className="navbar fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><h1>Taskify</h1></a>

          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="custom-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h1 className="offcanvas-title" id="offcanvasNavbarLabel">Taskify</h1>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
<li className='new'>
        <a href="/"  onClick={(e) => {
                      e.preventDefault(); 
                      allTask(); 
                    }}>
          <i className="bi bi-house"></i> <h5 id='link'>All tasks</h5>
        </a>
      </li>
      <li className='new'>
        <a href="/important"  onClick={(e) => {
                      e.preventDefault(); 
                      important(); 
                    }}>
          <i className="bi bi-star"></i> <h5 id='link'>Important tasks</h5>
        </a>
      </li>
      <li className='new'>
        <a href="/completed"  onClick={(e) => {
                      e.preventDefault(); 
                      completed(); 
                    }}>
          <i className="bi bi-check-circle"></i> <h5 id='link'>Completed tasks</h5>
        </a>
      </li>
      <li className='new'>
        <a href="/incompleted"  onClick={(e) => {
                      e.preventDefault(); 
                      incompleted(); 
                    }}>
          <i className="bi bi-x-circle"></i> <h5 id='link'>Incompleted tasks</h5>
        </a>
      </li>
             <li className="nav-item">
                  <a 
                    className="nav-link" 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      updateProfile(); 
                    }}
                  >
                    <i id='iconn' className="bi bi-person-circle"></i> <h5 id='log'>Account</h5>
                  </a>
                </li>
               
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      logout(); 
                    }}
                  >
                    <i id='iconn' className="bi bi-box-arrow-right"></i> <h5 id='log'>Logout</h5>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
