import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const RegisterForm = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }

    const fetchAreas = async () => {
      try {
        const response = await fetch("https://garbage-tracking-backend.onrender.com/areas/get-all-areas");
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, [navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://garbage-tracking-backend.onrender.com/user/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, address, phoneNumber, area, userId, password }),
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
        setError("Registration failed. Please try again.");
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
          <h1 className="text-center mb-4 fw-bold">Register</h1>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              />
            </Form.Group>

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

            <Form.Group className="mb-4">
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="userId">Aadhar ID Number</Form.Label>
              <Form.Control
                type="text"
                id="userId"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="area">Area</Form.Label>
              <Form.Control
                as="select"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                disabled={loading}
                className="custom-input"
                required
              >
                <option value="">Select an Area</option>
                {areas.map((area) => (
                  <option key={area._id} value={area._id}>{area.name}</option>
                ))}
              </Form.Control>
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default RegisterForm;
