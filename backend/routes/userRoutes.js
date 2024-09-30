const express = require("express");
const protect = require("../middlewares/authMiddleware"); // Import your middleware
const {
  getUserDetails,
  updateUserDetails,
  fetchUserSuggestions,
  fetchUserFriends,
  addFriendHandler,
  removeFriendHandler,
} = require("../controllers/userController"); // Import your user controller
const router = express.Router();

// Protect these routes with the middleware
router.get("/user-details",  getUserDetails); // Get user details route
router.put("/user-details",  updateUserDetails); // Update user details route

// routes/userRoutes.js
router.get("/suggestions",  fetchUserSuggestions);
router.get("/friends",  fetchUserFriends);
router.post("/add-friend/:friendId",  addFriendHandler);
router.post("/remove-friend/:friendId",  removeFriendHandler);

module.exports = router;
