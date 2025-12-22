const express = require('express');
const router = express.Router();
const Todo = require('../models/todo'); // तुमचा Todo model
const { incrAsync } = require('../util/redis');

// Create a new Todo
router.post('/', async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();

    // Redis counter increment
    await incrAsync('added_todos');

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
