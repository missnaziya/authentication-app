const db = require('../config/db');

const createUser = (userData, callback) => {
  const { name, age, email, password, otp } = userData;
  const query = `INSERT INTO users (name, age, email, password, otp) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [name, age, email, password, otp], callback);
};

const findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], callback);
};

const updateUserOtp = (email, otp, callback) => {
  const query = `UPDATE users SET otp = ? WHERE email = ?`;
  db.query(query, [otp, email], callback);
};
// Fetch user suggestions (excluding friends)
const getUserSuggestions = (userId, callback) => {
  const query = `
    SELECT id, name, email FROM users 
    WHERE id != ? AND id NOT IN (SELECT friend_id FROM friends WHERE user_id = ?)
  `;
  db.query(query, [userId, userId], callback);
};
// Fetch friends of a user
const getUserFriends = (userId, callback) => {
  const query = `
    SELECT u.id, u.name, u.email FROM friends f
    JOIN users u ON u.id = f.friend_id
    WHERE f.user_id = ?
  `;
  db.query(query, [userId], callback);
};

// Add a friend
const addFriend = (userId, friendId, callback) => {
  const query = `INSERT INTO friends (user_id, friend_id) VALUES (?, ?)`;
  db.query(query, [userId, friendId], callback);
};

// Remove a friend
const removeFriend = (userId, friendId, callback) => {
  const query = `DELETE FROM friends WHERE user_id = ? AND friend_id = ?`;
  db.query(query, [userId, friendId], callback);
};

module.exports = { createUser, findUserByEmail, updateUserOtp ,getUserSuggestions, getUserFriends, addFriend, removeFriend };
