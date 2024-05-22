import PropTypes from "prop-types";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/NavbarComponent.css";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-custom">
          Municipality Garbage Vehicle Monitoring System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <Nav className="navbar-left">
              <Navbar.Text className="navbar-text-custom">
                Welcome, {user.username}
              </Navbar.Text>
              <Button
                variant="outline-light"
                className="navbar-button-custom"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default NavBar;
