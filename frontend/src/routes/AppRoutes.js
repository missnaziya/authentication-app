import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'; // To access the auth state

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import OtpVerify from '../pages/auth/OtpVerify';
import Dashboard from '../pages/dashboard/Dashboard';
import MyAccount from '../pages/my-account/MyAccount';

const AppRoutes = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Get authentication state from Redux

  return (
    <div>
      <Routes>
        {/* Redirect to dashboard if already logged in */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        
        {/* Public routes */}
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/verify-otp" element={isAuthenticated ? <Navigate to="/dashboard" /> : <OtpVerify />} />

        {/* Private routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AppRoutes;
