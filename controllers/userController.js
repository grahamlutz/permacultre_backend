const User = require('../models/user');

// Create a new user
const createUser = async (userData) => {
  try {
    console.log(`beginning of createUser. userData: ${JSON.stringify(userData)})`)
    const newUser = await User.create(userData);
    console.log(newUser);
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Read user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw new Error('Error retrieving user');
  }
};

// Update user by ID
const updateUserById = async (userId, updateData) => {
  try {
    const [updatedRows] = await User.update(updateData, {
      where: { id: userId },
    });
    if (updatedRows === 0) {
      throw new Error('User not found');
    }
    const updatedUser = await User.findByPk(userId);
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

// Delete user by ID
const deleteUserById = async (userId) => {
  try {
    const deletedRows = await User.destroy({ where: { id: userId } });
    if (deletedRows === 0) {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};