import React, { useEffect, useState } from 'react';
import { Container, Button, ListGroup, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardComponent = () => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token is missing. Please log in again.');
          navigate('/login');
          return;
        }

        const suggestionsResponse = await axios.get('/api/user/suggestions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserSuggestions(suggestionsResponse.data);

        const friendsResponse = await axios.get('/api/user/friends', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(friendsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/user/add-friend/${friendId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends((prev) => [...prev, userSuggestions.find((user) => user.id === friendId)]);
      setUserSuggestions((prev) => prev.filter((user) => user.id !== friendId));
    } catch (err) {
      console.error('Error adding friend:', err);
      setError('Failed to add friend. Please try again.');
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/user/remove-friend/${friendId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
    } catch (err) {
      console.error('Error removing friend:', err);
      setError('Failed to remove friend. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Suggested Friends</Card.Header>
            <ListGroup variant="flush">
              {userSuggestions.length === 0 ? (
                <ListGroup.Item>No suggestions available</ListGroup.Item>
              ) : (
                userSuggestions.map((user) => (
                  <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                    {user.name} ({user.email})
                    <Button variant="success" onClick={() => handleAddFriend(user.id)}>Add Friend</Button>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Friends List</Card.Header>
            <ListGroup variant="flush">
              {friends.length === 0 ? (
                <ListGroup.Item>No friends yet</ListGroup.Item>
              ) : (
                friends.map((friend) => (
                  <ListGroup.Item key={friend.id} className="d-flex justify-content-between align-items-center">
                    {friend.name} ({friend.email})
                    <Button variant="danger" onClick={() => handleRemoveFriend(friend.id)}>Remove</Button>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button> */}
    </Container>
  );
};

export default DashboardComponent;
