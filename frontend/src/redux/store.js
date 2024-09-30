import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the auth reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Combine reducers (you can add more slices here later)
  },
});

export default store;
