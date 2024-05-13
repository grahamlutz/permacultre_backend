const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

require('dotenv').config({path: path.resolve(__dirname+'/.env')});

// Middleware
app.use(cors());
app.use(express.json());

const passport = require('./config/passport');
app.use(passport.initialize());

// Import the routes from routes/index.js
const routes = require('./routes');
const { authRoutes, userRoutes } = require('./routes');

// Routes
app.use('/auth', authRoutes);
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
