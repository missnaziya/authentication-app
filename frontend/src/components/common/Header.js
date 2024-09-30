import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';  // Import custom CSS for styling
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    toast.success("Logout Successfully.")
    navigate('/'); // Redirect to login page
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="brand-text">Auth App</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbar-nav" /> */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/dashboard" className="nav-link-item">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/my-account" className="nav-link-item">My Account</Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link-item">Logout</Nav.Link>
              </>
            ) 
            // : (
            //   <Nav.Link as={Link} to="/" className="nav-link-item">Sign In</Nav.Link>
            // )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
