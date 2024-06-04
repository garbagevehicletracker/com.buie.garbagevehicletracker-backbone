import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
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

        setUser(result); // Set the parsed user object

        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
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
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
