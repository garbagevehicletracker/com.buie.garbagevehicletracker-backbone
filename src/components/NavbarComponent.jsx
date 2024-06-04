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

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleDashboard = () => {
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand className="navbar-brand-custom navbar-brand-desktop">
          Municipality Garbage Vehicle Monitoring System
        </Navbar.Brand>
        <Navbar.Brand className="navbar-brand-custom navbar-brand-mobile">
          Garbage Monitoring
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="animate-navbar">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Button
                  variant="outline-light"
                  className="navbar-button me-2 w-100"
                  onClick={handleDashboard}
                >
                  Dashboard
                </Button>
                <Nav.Item className="navbar-text-custom me-2 w-100 text-center">
                  Welcome, {user.username}
                </Nav.Item>
                <Button
                  variant="outline-light"
                  className="navbar-button-custom w-100"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline-light"
                className="navbar-button active w-100"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Nav>
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
