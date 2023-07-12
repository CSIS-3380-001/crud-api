const express = require('express');
const router = express.Router();

// Read data from data.json file
const fs = require('fs');
const data = fs.readFileSync('data.json');
let jsonData = JSON.parse(data);

// GET /getusers - Get all users
router.get('/getusers', (req, res) => {
  res.json(jsonData);
});

// GET /getuser/:username - Get user by username
router.get('/getuser/:username', (req, res) => {
  const username = req.params.username;
  const user = jsonData.results.filter((user) => user.login.username === username);
  if (user.length >= 1) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST /newuser - Create a new user
router.post('/newuser', (req, res) => {
  const newUser = req.body;
  if (!newUser.login || !newUser.login.username || !newUser.login.password) {
    res.status(400).json({ message: 'Username and password are required' });
  } else {
    jsonData.results.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
  }
});

// PUT /user/:username - Update user by username
router.put('/user/:username', (req, res) => {
    const username = req.params.username;
    const updatedUser = req.body;
    const userIndex = jsonData.results.findIndex((user) => user.login.username === username);
    if (userIndex !== -1) {
        jsonData.results[userIndex] = { ...jsonData.results[userIndex], ...updatedUser };
        res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

// DELETE /user/:username - Delete user by username
router.delete('/user/:username', (req, res) => {
  const username = req.params.username;
  const userIndex = jsonData.results.findIndex((user) => user.login.username === username);
  if (userIndex !== -1) {
    jsonData.results.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


module.exports = router;