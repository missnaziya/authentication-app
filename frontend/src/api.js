import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your backend server URL

export const signup = async (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = async (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const verifyOtp = async (otpData) => {
  return axios.post(`${API_URL}/auth/verify-otp`, otpData);
};


// Fetch user details
export const getUserDetails = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  return axios.get(`${API_URL}/user/user-details`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in headers
    },
  });
};

// Update user details
export const updateUserDetails = async (userData) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  return axios.put(`${API_URL}/user/user-details`, userData, {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in headers
    },
  });
};
