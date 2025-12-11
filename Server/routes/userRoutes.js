const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getDefaultUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/default', getDefaultUser); // <-- new
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
