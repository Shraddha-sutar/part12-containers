const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://admin:secret@localhost:27017/tododb?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/todos', todosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
