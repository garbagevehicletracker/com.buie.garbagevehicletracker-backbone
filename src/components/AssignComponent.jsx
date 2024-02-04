// Import necessary libraries and dependencies
import React, { useState } from "react";
import axios from "axios";

// Functional component that represents the form
const AssignForm = ({ areaId,areaName, vehicles, drivers }) => {
  // State to manage selected values
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both vehicle and driver are selected
    if (selectedVehicle && selectedDriver) {
      try {
        // Make a POST request to the API endpoint
        const response = await axios.post(
          "https://garbage-tracking-backend.onrender.com/work/create-assign",
          {
            areaId,
            areaName,
            // driverId: selectedDriver,
            // vehicleId: selectedVehicle,
          }
        );

        // Handle the response as needed (e.g., show success message)
        console.log("Assignment successful", response.data);
      } catch (error) {
        // Handle errors (e.g., show error message)
        console.error("Error assigning work", error);
      }
    } else {
      // Handle case where either vehicle or driver is not selected
      console.error("Please select both a vehicle and a driver");
    }
  };

  return (
    <div>
      <h2>Assignment Form for {areaId}</h2>
      <h2>Assignment Form for {areaName}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vehicle">Select Vehicle:</label>
          <select
            id="vehicle"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="" disabled>
              -- Select Vehicle --
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="driver">Select Driver:</label>
          <select
            id="driver"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="" disabled>
              -- Select Driver --
            </option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AssignForm;
