const axios = require('axios');
const config = require('../config/config');
const apiUtils = require('../utils/apiUtils');

exports.fetchAllPlants = async () => {
  try {
    const url = `https://${config.USDA_API_BASE_URL}/plants`;
    const headers = apiUtils.getAuthHeaders()
    
    const response = await axios.get(url, {
      headers
    });
    
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch plants');
  }
}

// module.exports = [
//   fetchAllPlants,
// ]
