// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await userController.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userController.updateUserById(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    await userController.deleteUserById(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;