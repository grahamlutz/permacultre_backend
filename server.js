const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

require('dotenv').config({path: path.resolve(__dirname+'/.env')});

// Import the routes from routes/index.js
const routes = require('./routes');

// Cors middleware
app.use(cors());

// Mount the individual route handlers on the Express app
app.use('/api',  routes[0]);

// DB sync and listen
const db = require('./config/db');
db.sq.sync()
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
