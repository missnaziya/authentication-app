import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/common/Header'; // Import the common Navbar component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AppRoutes from './routes/AppRoutes'; // Import the routes
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Header /> {/* Common Header */}
        <div className="flex-grow-1 overflow-hidden">
          <AppRoutes /> {/* All routes are handled in AppRoutes */}
        </div>
        {/* Add ToastContainer for notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
