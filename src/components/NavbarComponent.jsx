import PropTypes from "prop-types";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = ({user,setUser}) => {
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container >
        <Navbar.Brand href="#home">Municipality Garbage Vehicle Monitoring System </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <Nav className="ml-auto">
              <Navbar.Text className="mr-3">Welcome, {user.username}</Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
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
};

export default NavBar;
