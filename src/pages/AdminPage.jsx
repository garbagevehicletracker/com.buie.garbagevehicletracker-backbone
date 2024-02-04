import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AssignForm from '../components/AssignForm';

const App = () => {
  // State to store data from APIs
  const [areas, setAreas] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetching data from APIs
    const fetchAreas = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://garbage-tracking-backend.onrender.com/areas/get-all-areas/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAreas(data);
    };

    const fetchDrivers = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://garbage-tracking-backend.onrender.com/drivers/get-all-drivers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setDrivers(data);
    };

    const fetchVehicles = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://garbage-tracking-backend.onrender.com/vehicles/get-vehicles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setVehicles(data);
    };

    // Call the fetch functions
    fetchAreas();
    fetchDrivers();
    fetchVehicles();
  }, []);

  return (
    <Container>
      <Row>
        {/* Future Section */}
        <Col xl={12}>
          <div style={{ width: '90%', height: '70vh', padding: '20px', margin: 'auto' , overflow: 'scroll'}}>
            <h2>Future Section</h2>
            {/* Displaying data from APIs and rendering AssignForm for each area */}
            {areas.map((area) => (
              <AssignForm
                key={area._id}
                area={area}
                driver={drivers}
                vehicle={vehicles}
              />
            ))}
          </div>
        </Col>
      </Row>

      {/* Buttons Section */}
      <Row className="mt-3">
        <Col>
          <Button variant="primary">
            Add Driver
          </Button>
        </Col>
        <Col>
          <Button variant="secondary">
            Add Vehicle
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
