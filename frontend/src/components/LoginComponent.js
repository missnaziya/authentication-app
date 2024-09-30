import React, { useState } from 'react';
import { login } from '../api'; // Ensure this is the correct path to your API functions
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';  // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import react-toastify CSS

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token); // Save JWT token
      
      // Trigger success toast notification
      toast.success('Login successful! Redirecting to dashboard...');
      
      // Navigate to dashboard after successful login
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      // setError('Login failed. Please check your credentials.');
      toast.error('Login failed. Please check your credentials.'); // Trigger error toast notification
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa', padding: 0 }}>
      <Row className="w-100 justify-content-center m-0">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg" style={{ backgroundColor: '#fff', height: '100%', maxHeight: '400px' }}>
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ backgroundColor: '#f0f0f0', borderColor: '#ced4da' }}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  Login
                </Button>

                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <a href="/signup" className="text-decoration-none" style={{ color: '#6c757d' }}>Sign up now</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
