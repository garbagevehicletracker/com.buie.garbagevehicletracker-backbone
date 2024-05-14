import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ShowDetailsComponent.css";
import withAuth from "../utils/withAuth";

// eslint-disable-next-line react/prop-types
const ShowDetailsComponent = ({ areaId, driverId, vehicleId }) => {
  const navigate = useNavigate();
  const [areaDetails, setAreaDetails] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);

  useEffect(() => {
    const getAuthToken = () => {
      // Implement logic to retrieve authToken from localStorage or cookies
      // Example:
      return localStorage.getItem("token");
    };
console.log(vehicleId,driverId,areaId)
    const authToken = getAuthToken();
    const fetchAreaDetails = async () => {
      try {
        const response = await fetch(
          `https://garbage-tracking-backend.onrender.com/areas/get-area-details/${areaId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAreaDetails(data);
        } else {
          console.error("Error fetching area details");
        }
      } catch (error) {
        console.error("Error fetching area details:", error);
      }
    };

    const fetchVehicleDetails = async () => {
      try {
        console.log(vehicleId)
        const response = await fetch(
          `https://garbage-tracking-backend.onrender.com/vehicles/get-vehicles/${vehicleId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setVehicleDetails(data);
          
        } else {
          console.error("Error fetching vehicle details");
        }
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    const fetchDriverDetails = async () => {
      try {
        const response = await fetch(
          `https://garbage-tracking-backend.onrender.com/drivers/get-all-drivers/${driverId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDriverDetails(data);
        } else {
          console.error("Error fetching driver details");
        }
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    };

    // Fetch area details, vehicle details, and driver details
    fetchAreaDetails();
    fetchVehicleDetails();
    fetchDriverDetails();
  }, [areaId, driverId, vehicleId]);

  const handleShowDetails = () => {
    const url = `/driver-vehicle-details?areaId=${areaId}&driverId=${driverId}&vehicleId=${vehicleId}`;
    navigate(url);
  };
  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        <div className="col-md-2">
          <img
            src={driverDetails?.image}
            className="img-fluid  rounded-circle"
            alt="Driver"
          />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">{areaDetails?.name}</h5>
            <p className="card-text">{driverDetails?.name}</p>
            <p className="card-text">{vehicleDetails?.registrationNo}</p>
         
          </div>
        </div>
        <div className="col-md-5">
          <div className="card-body d-flex align-items-end justify-content-end">
            <button className="btn btn-custom" onClick={handleShowDetails}>
              Show Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const ShowDetailsComponentWithAuth = withAuth(ShowDetailsComponent);

export default ShowDetailsComponentWithAuth;
