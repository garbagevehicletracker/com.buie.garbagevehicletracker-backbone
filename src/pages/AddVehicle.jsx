import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import withAuth from '../utils/withAuth';
const API_URL = '/api/vehicles/create-vehicle';

const VehicleForm = () => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [capacity, setCapacity] = useState('');
  const [size, setSize] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleCloseClick = () => {
    navigate("/admin"); // Redirect to Add Admin page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = {
      registrationNo,
      vehicleId,
      capacity: parseInt(capacity),
      type: size,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Vehicle created successfully!');
      } else {
        console.error('Failed to create vehicle');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registrationNo" className="form-label">Registration No:</label>
          <input
            type="text"
            className="form-control"
            id="registrationNo"
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleId" className="form-label">Vehicle ID:</label>
          <input
            type="text"
            className="form-control"
            id="vehicleId"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="capacity" className="form-label">Capacity:</label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size:</label>
          <input
            type="text"
            className="form-control"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">Submit</button>
        <button type="button" className="btn btn-secondary"  onClick={handleCloseClick}>Close</button>
      </form>
    </div>
  );
};
const VehicleFormWithAuth = withAuth(VehicleForm);
export default VehicleFormWithAuth;
