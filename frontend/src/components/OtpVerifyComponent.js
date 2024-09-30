import React, { useState, useEffect } from 'react';
import { verifyOtp } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const OtpVerifyComponent = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Get the email from the route state

  useEffect(() => {
    if (!email) {
      // If no email is passed, redirect back to the signup page
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      // Send both OTP and email to the backend
      await verifyOtp({ email, otp });
      toast.success('OTP verified successfully. Please login here...'); // Show success toast
      navigate('/login');
    } catch (err) {
      toast.error('OTP verification failed. Please try again.'); // Show error toast
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center m-0">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Verify OTP</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <p>OTP has been sent to your email: <strong>{email}</strong></p>
              <Form onSubmit={handleOtpVerify}>
                <Form.Group controlId="otp" className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#6c757d', border: 'none' }}>
                  Verify OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OtpVerifyComponent;
