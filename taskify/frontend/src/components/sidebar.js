import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/sidebar.css';
import axios from "axios";

const Sidebar = () => {
 
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://mern-stack-task-manager-app-1.onrender.com/api/v2/get-all-tasks", { headers });
        console.log(response.data.data); 
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);
  
  return (
    // <div className='pls'>
    <nav className="sidebar">
      {Data && Data.length > 0 && (
        <div>
          <h2>{Data.username}</h2>
          <h4>{Data.email}</h4>
          <hr />
        </div>
      )}  
        <ul>
          <li><Link to="/home"><i className="bi bi-house"id='icon'></i> <h6> All tasks</h6></Link></li>
          <li><Link to="/important"><i className="bi bi-star"id='icon'></i> <h6> Important tasks</h6></Link></li>
          <li><Link to="/completed"><i className="bi bi-check-circle"id='icon'></i> <h6> Completed tasks</h6></Link></li>
          <li><Link to="/incompleted"><i className="bi bi-x-circle" id='icon'></i> <h6> Incompleted tasks</h6></Link></li>
        </ul>
      </nav>
       /* <div className='tll'><TaskList/> </div>
      </div>  */
  );
};

export default Sidebar;

