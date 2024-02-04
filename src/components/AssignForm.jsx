// AssignForm.js
import React, { useState } from 'react';

const AssignForm = ({ area, driver, vehicle }) => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleSubmit = () => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');

    // Find the selected driver and vehicle by _id
    const selectedDriverData = driver.find((d) => d._id === selectedDriver);
    const selectedVehicleData = vehicle.find((v) => v._id === selectedVehicle);

    // Check if both driver and vehicle are selected
    if (selectedDriverData && selectedVehicleData) {
      // Prepare the data to send to the API
      const data = {
        areaId: area._id,
        driverId: selectedDriverData._id,
        vehicleId: selectedVehicleData._id,
      };

      // Print the data to console
      console.log('Data to be sent:', data);

      // Disable the submit button to prevent multiple submissions
      setIsSubmitting(true);

      // Make API request here using the data and token
      fetch('https://garbage-tracking-backend.onrender.com/work/create-assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(result => {
          // Handle the API response
          console.log(result);
          // Set submit success state
          setSubmitSuccess(true);
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
        })
        .finally(() => {
          // Enable the submit button after API request is complete
          setIsSubmitting(true);
        });
    } else {
      // Handle case when driver or vehicle is not selected
      console.error('Please select both driver and vehicle.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: '90%', height: '30%' }}>
        <div className="card-body">
          <p className="card-text">Area Name: {area.name}</p>
          <label htmlFor="driver" className="form-label">
            Select Driver:
          </label>
          <select
            id="driver"
            className="form-select"
            value={selectedDriver}
            onChange={handleDriverChange}
          >
            <option value="" disabled>
              Select a driver
            </option>
            {driver.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="vehicle" className="form-label">
            Select Vehicle:
          </label>
          <select
            id="vehicle"
            className="form-select"
            value={selectedVehicle}
            onChange={handleVehicleChange}
          >
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicle.map((v) => (
              <option key={v._id} value={v._id}>
                {v.vehicleId}
              </option>
            ))}
          </select>
          <br />
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submited' : 'Submit'}
          </button>
          {submitSuccess && <p className="text-success mt-2">Submitted successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default AssignForm;
