const knex = require('../database');

exports.createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const user_id = req.user.id;
  
  try {
    const [id] = await knex('tasks').insert({ title, description, completed, user_id });
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  const user_id = req.user.id;
  
  try {
    const tasks = await knex('tasks').where({ user_id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params; 
    const user_id = req.user.id;
    try {
      const task = await knex('tasks').where({ id, user_id }).first();
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' }); 
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' }); 
    }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const user_id = req.user.id;
  
  try {
    await knex('tasks').where({ id, user_id }).update({ title, description, completed });
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  
  try {
    const task = await knex('tasks').where({ id, user_id }).first();
      if (task) {
        await knex('tasks').where({ id, user_id }).del();
        res.status(200).json({ message: 'Task deleted successfully' }); 
      } else {
        res.status(404).json({ error: 'Task not found' }); 
      }
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
