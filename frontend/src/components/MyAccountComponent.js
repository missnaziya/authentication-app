import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserDetails } from '../api'; // Ensure these API functions are correctly defined
import { toast } from 'react-toastify';

const dummyUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: '30',
};

const MyAccountComponent = () => {
  const [user, setUser] = useState(dummyUserData); // Initialize with dummy data
  const [originalUserData, setOriginalUserData] = useState(dummyUserData); // Store original user data
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(); // Fetch user details from API
        setUser(response.data); // Use fetched data if available
        setOriginalUserData(response.data); // Store original user data
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch user details. Using dummy data.'); // Error handling
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any data has changed
    if (JSON.stringify(user) === JSON.stringify(originalUserData)) {
      toast.error('No changes detected.');
      return;
    }

    try {
      await updateUserDetails(user); // Call API to update user details
      toast.success('Profile updated successfully!');
      setOriginalUserData(user); // Update original data after successful update
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="w-100 justify-content-center m-0">
        <Col xs={12} sm={8} md={8} lg={8}>
          <Card className="shadow-lg" style={{ backgroundColor: '#fff' }}>
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">My Account</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: '#f0f0f0', borderColor: '#ced4da' }}
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: '#f0f0f0', borderColor: '#ced4da' }}
                  />
                </Form.Group>

                <Form.Group controlId="age" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={user.age}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: '#f0f0f0', borderColor: '#ced4da' }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  style={{ backgroundColor: '#6c757d', border: 'none' }}
                >
                  Update Profile
                </Button>

                {/* Uncomment if you want to allow logout */}
                {/* 
                <Button variant="danger" className="w-100" onClick={handleLogout}>
                  Logout
                </Button> 
                */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccountComponent;
