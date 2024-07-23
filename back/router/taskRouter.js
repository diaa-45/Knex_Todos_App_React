const express = require('express');
const { createTask, getTasks,getTaskById ,updateTask, deleteTask } = require('../controller/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, createTask);
router.get('/get', auth, getTasks);
router.get('/getOne/:id', auth,  getTaskById);
router.put('/update/:id', auth, updateTask);
router.delete('/delete/:id' , auth, deleteTask);

module.exports = router;
