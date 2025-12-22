const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const todoRouter = require('./routes/todos');
const { getAsync, setAsync, incrAsync, client } = require('./util/redis'); // Redis

const app = express();

/* =======================
   MongoDB connection
======================= */
const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:secret@localhost:27017/tododb?authSource=admin';

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

/* =======================
   Middlewares
======================= */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* =======================
   Routes
======================= */
app.use('/todos', todoRouter);

/* =======================
   Statistics endpoint
======================= */
app.get('/statistics', async (req, res) => {
  try {
    const count = (await getAsync('added_todos')) || 0;
    res.json({ added_todos: Number(count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export Redis functions for routes
app.locals.redis = { getAsync, setAsync, incrAsync, client };

module.exports = app;
