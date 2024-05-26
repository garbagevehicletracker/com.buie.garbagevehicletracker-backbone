import { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import withAuth from "../utils/withAuth";
import Skeleton from "../components/Skeleton";
import "../styles/TrackingMap.css"; // Ensure you have the CSS file imported

const TrackingMap = () => {
  const getQueryParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedParam = urlParams.get(name);
    return encodedParam ? atob(encodedParam) : null;
  };

  const [areaData, setAreaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [areaId, setAreaId] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const areaId = getQueryParameter("areaId");
    setAreaId(areaId);
    const driverId = getQueryParameter("driverId");
    setDriverId(driverId);
    const vehicleId = getQueryParameter("vehicleId");
    setVehicleId(vehicleId);

    const fetchAreaData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          `https://garbage-tracking-backend.onrender.com/areas/get-area-details/${areaId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch area details");
        }

        const data = await response.json();
        setAreaData(data);
      } catch (error) {
        console.error("Error fetching area data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (areaId) {
      fetchAreaData();
    } else {
      setError("Invalid area ID");
      setLoading(false);
    }
  }, [areaId]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`tracking-map-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="map-container">
        <MapComponent
          areaData={areaData}
          driverId={driverId}
          vehicleId={vehicleId}
        />
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Open"} Sidebar
        </button>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Header Text</h2>
        <p>This is the side content.</p>
        <div>
          <h3>Decoded Parameters</h3>
          <p>Area ID: {areaId}</p>
          <p>Driver ID: {driverId}</p>
          <p>Vehicle ID: {vehicleId}</p>
        </div>
      </div>
    </div>
  );
};

const TrackingMapWithAuth = withAuth(TrackingMap);

export default TrackingMapWithAuth;
