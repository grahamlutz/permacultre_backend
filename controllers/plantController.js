const plantService = require('../services/plantService');

exports.getAllPlants = async (req, res) => {
  try {
    // const { location } = req.params;
    console.log('inside getAllPlants');
    const plants = await plantService.fetchAllPlants();
    return plants;
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};