const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample hardcoded user data
let users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 3, username: 'user3', password: 'password3' }
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// CREATE a new user
app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const id = users.length + 1;
  const newUser = { id, username, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user by ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], username, password };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
