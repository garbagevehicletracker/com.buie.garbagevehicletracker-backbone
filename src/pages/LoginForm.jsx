// import dotenv from "dotenv";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
// dotenv.config();

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to homepage if token exists
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
      setError("");
  
      const response = await fetch(
        "https://garbage-tracking-backend.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        const { token, result } = data;
  
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(result)); // Store user data
  
        navigate("/admin");
      } else {
        console.error("Login failed");
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="form-body ">
      <Container className="rounded-lg p-4 d-flex flex-column align-items-center justify-content-center min-vh-100 login-container">
        {loading && (
          <div className="spinner-overlay">
            <Spinner animation="border" role="status" variant="success">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <div className="login-form">
          <h1 className="text-center mb-4 fw-bold">Log in</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              />
            </Form.Group>

            {error && (
              <div className="text-center text-danger mb-4">{error}</div>
            )}

            <Button
              variant="success"
              type="submit"
              className="w-100 btn-lg"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
