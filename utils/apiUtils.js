const config = require('../config/config');

exports.getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': `${config.USDA_API_KEY}`,
    'X-RapidAPI-Host': `${config.USDA_API_BASE_URL}`,
  };
}