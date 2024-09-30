import React, { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, age, email, password });
      toast.success('Signup successful! Please verify your OTP.');
      // Pass the email to the OTP verification page
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      console.log(err);
      
      toast.error(err.response.data.message)
      // setError('Signup failed. Please check your details.');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa', padding: 0 }}>
      <Row className="w-100 justify-content-center m-0">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg" style={{ backgroundColor: '#fff', height: '100%', maxHeight: '600px' }}>
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">Signup</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ backgroundColor: '#f0f0f0', borderColor: '#ced4da' }}
                  />
                </Form.Group>
                <Form.Group controlId="age" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    style={{ backgroundColor: '#f0f0f0', borderColor: '#ced4da' }}
                  />
                </Form.Group>
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
                  Signup
                </Button>

                {/* Add Sign In Link */}
                <div className="text-center mt-3">
                  <span>Already have an account? </span>
                  <a href="/" className="text-decoration-none" style={{ color: '#6c757d' }}>Sign in now</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupComponent;
