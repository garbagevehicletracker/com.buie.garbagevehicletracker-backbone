import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Add cleanup logic if needed
    return () => {
      // Cleanup logic
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://52.63.51.138:5500/admin/login",
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
        const token = data.token;

        // Store token in localStorage or a state management solution of your choice
        localStorage.setItem("token", token);

        // Redirect to AdminPage on successful login
        navigate("/admin"); // Use navigate from React Router
      } else {
        console.error("Login failed");
        setError("Login failed. Please try again."); // Set an appropriate error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again."); // Set an appropriate error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className=" rounded-lg p-4  d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="d-flex flex-column align-items-center ">
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
              />
            </Form.Group>

            {error && (
              <div className="text-center text-danger mb-4">{error}</div>
            )}

            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-lg"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
