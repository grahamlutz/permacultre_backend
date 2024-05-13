const express = require('express');
const cors = require('cors');
const axios = require('axios');

const router = express.Router();

const { getAllPlants } = require('../controllers/plantController');

router.get('/plants/', (req, res) => {
  const { zip } = req.params;

  try {
    const response = getAllPlants()
    .then((response) => {
      res.json([response])
    });
  } catch (error) {
    console.error('Error fetching plant data:');
  }
  // res.json(['30087']);
})

module.exports = router;