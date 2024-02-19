// import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Remove the unused import statement
import PropTypes from 'prop-types';

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Your App Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {/* Add more Nav.Link components for other navigation options */}
          </Nav>
          {user ? (
            <Nav className="ml-auto">
              <Navbar.Text className="mr-3">Welcome, {user.name}</Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
};

export default NavBar;
