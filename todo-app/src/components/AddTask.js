import React, { useState } from 'react';
import './add-task.css'

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3030/api/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });
    if (response.ok) {
      alert('Task added successfully!');
      window.location.href = '/tasks';
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Add Task</h1>
      <form onSubmit={handleAddTask}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
