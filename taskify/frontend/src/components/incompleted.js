import React, { useState, useEffect } from 'react';
import Task from './task';
import InputData from './inputData';
import './styles/tasklist.css';
import Header from "./header";
import Sidebar from "./sidebar";

function IncompleteTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchIncompleteTasks(); 
  }, []);

  const fetchIncompleteTasks = async () => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/api/v2/get-incomplete-tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'id': userId,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.data);
      } else {
        console.error('Failed to fetch incomplete tasks');
      }
    } catch (error) {
      console.error('Error fetching incomplete tasks:', error);
    }
  };

  return (
    <div className="incomplete-tasks">
       <Header />
       <Sidebar />
       <div className='tll'>

      <div className="task-list">
        {tasks.map(task => (
          <Task key={task._id} task={task} onUpdate={fetchIncompleteTasks} />
        ))}
      </div>
      </div>
    </div>
  );
}

export default IncompleteTasks;
