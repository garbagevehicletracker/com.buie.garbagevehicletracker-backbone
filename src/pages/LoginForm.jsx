import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoginForm = () => {
  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://garbage-tracking-backend.onrender.com/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token } = data;

      // Store the token globally (e.g., in a state management library like Redux, or use Context API)
      // For simplicity, using localStorage in this example
      storeToken(token);

      // Redirect to AdminPage
      // navigate('/admin');

    } catch (error) {
      // Show error alert
      alert('Login failed. Please check your credentials.');
    }
  };

  const storeToken = (token) => {
    // You can use localStorage or other secure storage mechanism to store the token
    localStorage.setItem('jwtToken', token);

    // Set a timeout to clear the token after 1 hour
    setTimeout(() => {
      localStorage.removeItem('jwtToken');
    }, 3600000); // 1 hour in milliseconds
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <p>Please enter your username and password to login.</p>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
