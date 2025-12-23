const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todos')
const { getAsync, setAsync, incrAsync, client } = require('./util/redis')

const app = express()
console.log('live reload working')

/* =======================
   MongoDB connection
======================= */

// ❗ Docker ENV FIRST (no localhost hardcode)
const mongoUrl = process.env.MONGO_URL

if (!mongoUrl) {
  console.error('❌ MONGO_URL is not defined')
  process.exit(1)
}

mongoose
  .connect(mongoUrl)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ Mongo error:', err.message)
    process.exit(1)
  })

/* =======================
   Middlewares
======================= */
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* =======================
   Routes
======================= */
app.use('/todos', todoRouter)

/* =======================
   Statistics endpoint
======================= */
app.get('/statistics', async (req, res) => {
  try {
    const count = (await getAsync('added_todos')) || 0
    res.json({ added_todos: Number(count) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* =======================
   Redis helpers for routes
======================= */
app.locals.redis = {
  getAsync,
  setAsync,
  incrAsync,
  client
}

module.exports = app
