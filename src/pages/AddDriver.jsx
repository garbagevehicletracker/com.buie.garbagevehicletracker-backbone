import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const YourComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    driverId: '',
    phoneNumbers: '',
    gender: 'male', // default value, you can change it based on your requirement
    age: '',
    image: '',
  });

  const handleSubmit = async () => {
    // Assuming you have fetched the JWT token from local storage
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://garbage-tracking-backend.onrender.com/drivers/create-driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // Handle success as needed
      } else {
        console.error('Error submitting data');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDriverId">
              <Form.Label>Driver ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Driver ID"
                value={formData.driverId}
                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumbers">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={formData.phoneNumbers}
                onChange={(e) => setFormData({ ...formData, phoneNumbers: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Male"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={() => setFormData({ ...formData, gender: 'male' })}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={() => setFormData({ ...formData, gender: 'female' })}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Photograph URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photograph URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>{' '}
            <Button variant="secondary">Close</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default YourComponent;
