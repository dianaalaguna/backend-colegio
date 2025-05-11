// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userTypes = require('./routes/userType');
const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/student');
const subjectRoutes = require('./routes/subject');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/userType', userTypes);
app.use('/api/user', userRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/subject', subjectRoutes);

// Connect to MongoDB
// Tener presente la variable MONGO_URI
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
