import React, { useState, useEffect } from 'react';
import Task from './task';
import InputData from './inputData';
import './styles/tasklist.css';
import Header from "./header";
import Sidebar from "./sidebar";

function Important(){
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/api/v2/get-imp-tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'id': userId,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.data)
        setTasks(data.data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:4000/api/v2/delete-task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'id': userId,
        },
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return(
    <>
     <Header />
     <div className="pls">
            <Sidebar />
          </div>
          <div className='tll'>
          <div className="task-list">
      {tasks.map(task => (
        <Task key={task._id} task={task} onDelete={handleDeleteTask} />
      ))}
     
      <InputData isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTask} />
    </div>
    </div>
    </>
  )
}
export default Important;