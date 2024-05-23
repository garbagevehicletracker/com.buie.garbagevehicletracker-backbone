import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Form } from 'react-bootstrap';
// import { useNavigate } from "react-router-dom";
import withAuth from '../utils/withAuth';
import styled from "styled-components";

const API_URL = 'https://garbage-tracking-backend.onrender.com/vehicles/create-vehicle';


const HeadingStyled = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  color: green; /* Change the color to green */
`;
// eslint-disable-next-line react/prop-types
const AddVehicle = ({ onHide }) => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [capacity, setCapacity] = useState('');
  const [size, setSize] = useState('');
  // const navigate = useNavigate(); // Initialize useNavigate hook

  // const handleCloseClick = () => {
  //   onHide();
  //   navigate("/admin"); // Redirect to Admin page
  // };

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
        onHide();
      } else {
        console.error('Failed to create vehicle');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

        <Form onSubmit={handleSubmit}>
          <HeadingStyled>Add Vehicle</HeadingStyled>
          <Form.Group className="mb-3" controlId="registrationNo">
            <Form.Label>Registration No</Form.Label>
            <Form.Control
              type="text"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
              placeholder="Enter registration number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="vehicleId">
            <Form.Label>Vehicle ID</Form.Label>
            <Form.Control
              type="text"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              placeholder="Enter vehicle ID"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="capacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter capacity"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Enter size"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            {/* <Button variant="secondary" onClick={handleCloseClick} className="me-2">Close</Button> */}
            <Button variant="success" type="submit">Submit</Button>
          </div>
        </Form>
    //   </Modal.Body>
    // </Modal>
  );
};

const AddVehicleWithAuth = withAuth(AddVehicle);
export default AddVehicleWithAuth;
