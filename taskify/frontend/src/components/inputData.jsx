import React, { useState } from 'react';
import './styles/inputData.css';

const InputData = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (title && description) {
      try {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        const response = await fetch('https://mern-stack-task-manager-app-1.onrender.com/api/v2/create-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': userId,
          },
          body: JSON.stringify({ title, desc: description }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server Response:', errorText);
          throw new Error(`Failed to save the task: ${errorText}`);
        }

        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Failed to parse JSON:', jsonError);
          throw new Error('Failed to parse server response');
        }

        onSubmit(data.task); 
        setTitle('');
        setDescription('');
        onClose();
      } catch (error) {
        console.error('Error saving task:', error);
        alert(`Failed to save the task: ${error.message}`);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 id='newTask'>Add a New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-textarea"
        ></textarea>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputData;
