import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
      setError("");
  
      const response = await fetch(
        "https://garbage-tracking-backend.onrender.com/user/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login response data:", data);
  
        const { token, user } = data;
        console.log("User data received from server:", user);
  
        if (user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user)); // Store user data
          console.log("User data stored in localStorage:", localStorage.getItem("user"));
  
          setUser(user); // Update the user state
          navigate("/");
        } else {
          setError("User data received from server is invalid.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-body">
      <Container className="login-container">
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
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 password-group">
              <Form.Label htmlFor="password">Password</Form.Label>
              <div className="password-wrapper">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="custom-input"
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon"
                />
              </div>
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
            <Button
              variant="failed"
              onClick={() => navigate("/register")}
              className="w-100 btn-lg mt-2 border"
            >
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
