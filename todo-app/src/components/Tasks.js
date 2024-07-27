import React, { useEffect, useState } from 'react';
import './tasks.css'; // Import the CSS file

function Tasks() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3030/api/tasks/get', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const tasks = await response.json();
        setTasks(tasks);
      } else {
        alert('Failed to fetch tasks');
        window.location.href = '/login';
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3030/api/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id));
    } else {
      alert('Failed to delete task');
    }
  };

  const handleToggleComplete = async (id) => {
    const token = localStorage.getItem('token');
    const task = tasks.find(t => t.id === id);
    const response = await fetch(`http://localhost:3030/api/tasks/update/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ completed: !task.completed })
    });
    if (response.ok) {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } else {
      alert('Failed to update task');
    }
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <button className="add-task-button" onClick={() => window.location.href='/add-task'}>Add Task</button>
      <button className="back-login-button" onClick={() => window.location.href='/login'}>Login Page</button>
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <span style={{ textTransform: task.completed ? 'uppercase' : 'none' }}>{task.title}</span>
          <button className="complete-button" onClick={() => handleToggleComplete(task.id)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
