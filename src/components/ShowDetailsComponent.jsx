import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          {loading ? (
            <Skeleton circle={true} height={50} width={50} />
          ) : (
            <img
              src={driverDetails?.image}
              className="img-fluid driver-image"
              alt="Driver"
            />
          )}
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">
              Area Name :{" "}
              {loading ? (
                <Skeleton width={100} className="skeleton-loading title" />
              ) : (
                areaDetails?.name
              )}
            </h5>
            <p className="card-text">
              <b>Driver name :</b>{" "}
              {loading ? (
                <Skeleton width={80} className="skeleton-loading driver-name" />
              ) : (
                driverDetails?.name
              )}
            </p>
            <p className="card-text">
              <b>Vehicle Registration No :</b>{" "}
              {loading ? (
                <Skeleton
                  width={60}
                  className="skeleton-loading vehicle-registration"
                />
              ) : (
                vehicleDetails?.registrationNo
              )}
            </p>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card-body d-flex align-items-end justify-content-end">
            {loading ? (
              <Skeleton width={100} height={30} />
            ) : (
              <button className="btn btn-custom" onClick={handleShowDetails}>
                Show Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowDetailsComponentWithAuth = withAuth(ShowDetailsComponent);

export default ShowDetailsComponentWithAuth;
