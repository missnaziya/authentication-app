const db = require('../config/db');

// Add a friend
const addFriend = (req, res) => {
  const { userId, friendId } = req.body;
  const query = `INSERT INTO friends (user_id, friend_id) VALUES (?, ?)`;
  db.query(query, [userId, friendId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error adding friend' });
    }
    res.status(201).json({ message: 'Friend added successfully' });
  });
};

// Remove a friend
const removeFriend = (req, res) => {
  const { userId, friendId } = req.body;
  const query = `DELETE FROM friends WHERE user_id = ? AND friend_id = ?`;
  db.query(query, [userId, friendId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error removing friend' });
    }
    res.status(200).json({ message: 'Friend removed successfully' });
  });
};

// Get friends list
const getFriendsList = (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT friend_id FROM friends WHERE user_id = ?`;
  db.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching friends list' });
    }
    res.status(200).json(results);
  });
};

module.exports = { addFriend, removeFriend, getFriendsList };
