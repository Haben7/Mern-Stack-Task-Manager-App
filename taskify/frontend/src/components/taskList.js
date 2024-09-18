
import React, { useState, useEffect } from 'react';
import Task from './task';
import InputData from './inputData';
import './styles/tasklist.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const response = await fetch('https://mern-stack-task-manager-app-1.onrender.com/api/v2/get-all-tasks', {
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

      const response = await fetch(`https://mern-stack-task-manager-app-1.onrender.com/api/v2/delete-task/${taskId}`, {
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

  return (
    <div className='tll'>
         <div className="task-list">
      {tasks.map(task => (
        <Task key={task._id} task={task} onDelete={handleDeleteTask} onUpdate={fetchTasks} />
      ))}
      <button id="add" className="task-list" onClick={() => setIsModalOpen(true)}>
        <i id="more" className="bi bi-plus-circle"></i>
        <p id="p">Add Task</p>
      </button>
      <InputData isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTask} />
    </div>
    </div>
 
  );
};

export default TaskList;
