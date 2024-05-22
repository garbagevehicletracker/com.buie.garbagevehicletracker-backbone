import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "../styles/ShowDetailsComponent.css";
import withAuth from "../utils/withAuth";

// eslint-disable-next-line react/prop-types
const ShowDetailsComponent = ({ areaId, driverId, vehicleId }) => {
  const navigate = useNavigate();
  const [areaDetails, setAreaDetails] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthToken = () => localStorage.getItem("token");

    const authToken = getAuthToken();

    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setState(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    const fetchDetails = async () => {
      setLoading(true);
      await Promise.all([
        fetchData(
          `https://garbage-tracking-backend.onrender.com/areas/get-area-details/${areaId}`,
          setAreaDetails
        ),
        fetchData(
          `https://garbage-tracking-backend.onrender.com/vehicles/get-vehicles/${vehicleId}`,
          setVehicleDetails
        ),
        fetchData(
          `https://garbage-tracking-backend.onrender.com/drivers/get-all-drivers/${driverId}`,
          setDriverDetails
        ),
      ]);
      setLoading(false);
    };

    fetchDetails();
  }, [areaId, driverId, vehicleId]);

  const handleShowDetails = () => {
    const encodedAreaId = btoa(areaId);
    const encodedDriverId = btoa(driverId);
    const encodedVehicleId = btoa(vehicleId);
    const url = `/driver-vehicle-details?areaId=${encodedAreaId}&driverId=${encodedDriverId}&vehicleId=${encodedVehicleId}`;
    navigate(url);
  };

  if (loading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        <div className="col-md-2">
          <img
            src={driverDetails?.image}
            className="img-fluid rounded-circle"
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
