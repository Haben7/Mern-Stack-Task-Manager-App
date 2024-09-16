// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import './task.css';


// const Task = ({ task, onDelete, onUpdate }) => {
//   const [checked, setChecked] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [title, setTitle] = useState(task.title);
//   const [description, setDescription] = useState(task.desc);
//   //const [checked, setChecked] = useState(task.complete);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleEditTask = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch(`http://localhost:4000/api/v2/update-task/${task._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title, desc: description }),
//       });

//       if (response.ok) {
//         setIsEditing(false);
//         onUpdate();
//       } else {
//         console.error('Failed to update the task');
//       }
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   };

//   const handleCheck = async () => {
//     try {
//       const token = localStorage.getItem('token');
  
//       const response = await fetch(`http://localhost:4000/api/v2/update-complete-task/${task._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       if (response.ok) {
//         const data = await response.json();
  
//         setChecked(data.task.completed);
//         onUpdate(); 
//       } else {
//         console.error('Failed to update task completion');
//       }
//     } catch (error) {
//       console.error('Error updating task completion:', error);
//     }
//   };
  
//   const handleToggleImportant = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch(`http://localhost:4000/api/v2/update-imp-task/${task._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {

//         onUpdate();
//       } else {
//         console.error('Failed to update task importance');
//       }
//     } catch (error) {
//       console.error('Error updating task importance:', error);
//     }
//   };

//   return (
//     <div className="task">
//       <div className="task-content">
//         {isEditing ? (
//           <>
//             <div className="modal-overlay">
//               <div className="modal-content">
//                 <button className="close-button" onClick={handleEditToggle}>
//                   &times;
//                 </button>
//                 <h2 id='newTask'>Edit Task</h2>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="modal-input"
//                 />
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="modal-textarea"
//                 ></textarea>
//                 <button onClick={handleEditTask} className="submit-button">
//                   Save
//                 </button>
//                 <button onClick={handleEditToggle} className="submit-button">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <h3>{task.title}</h3>
//             <hr />
//             <p>{task.desc}</p>
//           </>
//         )}
//       </div>
//       <div className="task-buttons">
//       <button onClick={handleCheck} className="status-button">
//         <FontAwesomeIcon
//           icon={checked ? faCheckCircle : faTimesCircle}
//           className={checked ? 'icon-checked' : 'icon-unchecked'}
//         />
//       </button>

//         <button onClick={handleEditToggle}>
//           <i id='icon' className="bi bi-pencil"></i>
//         </button>

//         <button onClick={() => onDelete(task._id)}>
//           <i id="icon" className="bi bi-trash"></i>
//         </button>

//         <button onClick={handleToggleImportant}>
//           {task.important ? (
//             <i className="bi bi-star-fill" style={{ color: 'purple' }}></i>
//           ) : (
//             <i id='icon' className="bi bi-star"></i>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Task;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './styles/task.css';

const Task = ({ task, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(task.completed); // Initialize with task.completed
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.desc);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditTask = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`https://mern-stack-task-manager-app-1.onrender.com/api/v2/update-task/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, desc: description }),
      });

      if (response.ok) {
        setIsEditing(false);
        onUpdate();
      } else {
        console.error('Failed to update the task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCheck = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`https://mern-stack-task-manager-app-1.onrender.com/api/v2/update-complete-task/${task._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setChecked(data.task.completed); 
  
        onUpdate(); 
  
      } else {
        console.error('Failed to update task completion');
      }
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };
  
  const handleToggleImportant = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`https://mern-stack-task-manager-app-1.onrender.com/api/v2/update-imp-task/${task._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onUpdate();
      } else {
        console.error('Failed to update task importance');
      }
    } catch (error) {
      console.error('Error updating task importance:', error);
    }
  };

  return (
    <div className="task">
      <div className="task-content">
        {isEditing ? (
          <>
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-button" onClick={handleEditToggle}>
                  &times;
                </button>
                <h2 id='newTask'>Edit Task</h2>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="modal-input"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="modal-textarea"
                ></textarea>
                <button onClick={handleEditTask} className="submit-button">
                  Save
                </button>
                <button onClick={handleEditToggle} className="submit-button">
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <hr />
            <p>{task.desc}</p>
          </>
        )}
      </div>
      <div className="task-buttons">
      <button onClick={handleCheck} className="status-button">
  <FontAwesomeIcon
    icon={checked ? faCheckCircle : faTimesCircle}
    className={checked ? 'icon-checked' : 'icon-unchecked'}
  />
</button>

        <button onClick={handleEditToggle}>
          <i id='icon' className="bi bi-pencil"></i>
        </button>

        <button onClick={() => onDelete(task._id)}>
          <i id="icon" className="bi bi-trash"></i>
        </button>

        <button onClick={handleToggleImportant}>
          {task.important ? (
            <i className="bi bi-star-fill" style={{ color: 'purple' }}></i>
          ) : (
            <i id='icon' className="bi bi-star"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Task;
