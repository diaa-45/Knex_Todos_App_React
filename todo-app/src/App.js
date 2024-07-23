import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Tasks />} /> {/* Default route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </div>
  );
}

export default App;
