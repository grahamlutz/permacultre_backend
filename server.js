const express = require('express');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

require('dotenv').config({path: path.resolve(__dirname+'/.env')});

// Import the routes from routes/index.js
const routes = require('./routes');
const { authRoutes, userRoutes } = require('./routes');

// Cors middleware
app.use(cors());

app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
// app.use('/api',  routes[0]);
app.use('/users', userRoutes);

// DB sync and listen
const db = require('./config/db');
db.sq.sync({force: true})
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
