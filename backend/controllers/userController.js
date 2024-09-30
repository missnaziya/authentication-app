const db = require('../config/db');

// Get user details
const getUserDetails = (req, res) => {
  const userId = req.user; // Assuming user ID is attached to req by the protect middleware
  db.query('SELECT name, email, age FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching user details' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]); // Send back user details
  });
};

// Update user details
const updateUserDetails = (req, res) => {
  const userId = req.user; // Assuming user ID is attached to req by the protect middleware
  const { name, email, age } = req.body;
  
  db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, userId], (err) => {
    if (err) return res.status(500).json({ message: 'Error updating user details' });
    res.json({ message: 'User details updated successfully' });
  });
};




// Fetch user suggestions
const fetchUserSuggestions = (req, res) => {
  const userId = req.user; // Assuming you store user id in req.user
  getUserSuggestions(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching suggestions' });
    res.json(results);
  });
};

// Fetch user friends
const fetchUserFriends = (req, res) => {
  const userId = req.user;
  getUserFriends(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching friends' });
    res.json(results);
  });
};

// Add a friend
const addFriendHandler = (req, res) => {
  const userId = req.user;
  const { friendId } = req.params;
  addFriend(userId, friendId, (err) => {
    if (err) return res.status(500).json({ message: 'Error adding friend' });
    res.status(201).json({ message: 'Friend added successfully' });
  });
};

// Remove a friend
const removeFriendHandler = (req, res) => {
  const userId = req.user;
  const { friendId } = req.params;
  removeFriend(userId, friendId, (err) => {
    if (err) return res.status(500).json({ message: 'Error removing friend' });
    res.status(200).json({ message: 'Friend removed successfully' });
  });
};


module.exports = { getUserDetails, updateUserDetails, fetchUserSuggestions,
    fetchUserFriends,
    addFriendHandler,
    removeFriendHandler, };
