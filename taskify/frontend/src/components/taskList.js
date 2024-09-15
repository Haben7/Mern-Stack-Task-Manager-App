// // import React, { useState } from 'react';
// // import Task from './task';
// // import InputData from './inputData';
// // import './tasklist.css';


// // const TaskList = () => {
// //   const [tasks, setTasks] = useState([
// //     { id: 1, title: 'test 1', description: ' laboris nisi ut aliquip ex ea commodo consequat. Duis aute irur laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ', status: 'incompleted' },
// //     { id: 2, title: 'Build penny juice app', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ', status: 'incompleted' },
// //     { id: 3, title: 'Learn Python', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ', status: 'incompleted' },
// //     { id: 4, title: 'Learn React', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim v', status: 'incompleted' },
// //     { id: 5, title: 'Build a Portfolio', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a ullamco', status: 'incompleted' },
// //       { id: 6, title: 'Learn Nodejs', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ', status: 'incompleted' },
      
// //   ]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const handleAddTask = (newTask) => {
// //     setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: 'incompleted' }]);
// //   };

// //   const moveToTrash = (taskId) => {
// //     setTasks(tasks.map(task =>
// //       task.id === taskId ? { ...task, trashed: true } : task
// //     ));
// //   };

// //   const filteredTasks = tasks.filter(task => !task.trashed);
// //   return (
// //         <div className="task-list">
// //         {filteredTasks.map(task => (
// //           <Task key={task.id} task={task} onMoveToTrash={moveToTrash} />
// //         ))}
// //        <button id="add" className="task-list" onClick={() => setIsModalOpen(true)}>
// //         <i id="more" className="bi bi-plus-circle"></i>
// //         <p id="p">Add Task</p>
// //       </button>
// //       <InputData isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTask} />
// //     </div>
// //   );
// // };

// // export default TaskList;
// import React, { useState, useEffect } from 'react';
// import Task from './task';
// import InputData from './inputData';
// import './tasklist.css';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const userId = localStorage.getItem('id');
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:4000/api/v2/get-all-tasks', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'id': userId,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTasks(data.data);
//       } else {
//         console.error('Failed to fetch tasks');
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleAddTask = (newTask) => {
//     setTasks([...tasks, newTask]);
//   };

//   const handleDeleteTask = async (taskId) => {
//     try {
//       const userId = localStorage.getItem('id');
//       const token = localStorage.getItem('token');

//       const response = await fetch(`http://localhost:4000/api/v2/delete-task/${taskId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'id': userId,
//         },
//       });

//       if (response.ok) {
//         setTasks(tasks.filter(task => task._id !== taskId));
//       } else {
//         console.error('Failed to delete task');
//       }
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div className="task-list">
//       {tasks.map(task => (
//         <Task key={task._id} task={task} onDelete={handleDeleteTask} />
//       ))}
//       <button id="add" className="task-list" onClick={() => setIsModalOpen(true)}>
//         <i id="more" className="bi bi-plus-circle"></i>
//         <p id="p">Add Task</p>
//       </button>
//       <InputData isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTask} />
//     </div>
//   );
// };

// export default TaskList;
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

      const response = await fetch('http://localhost:4000/api/v2/get-all-tasks', {
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
