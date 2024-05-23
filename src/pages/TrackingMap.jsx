// // /frontend/src/components/MapComponent.jsx
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const YourComponent = () => {
//   const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

//   useEffect(() => {
//     // Connect to the server's socket.io instance
//     const socket = io('https://garbage-tracking-backend.onrender.com/'); // Update this URL
//     // const socket = io("http://localhost:5500"); // Update this URL

//     // Listen for 'connect' event
//     socket.on("connect", () => {
//       console.log("Socket connected successfully!");
//     });

//     // Listen for 'coordinatesUpdated' event
//     socket.on("coordinatesUpdated", (updatedCoordinates) => {
//       // Update the state with the new coordinates
//       setCoordinates(updatedCoordinates);
//     });

//     // Cleanup the socket connection when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Real-time Coordinates</h1>
//       <p>Latitude: {coordinates.latitude}</p>
//       <p>Longitude: {coordinates.longitude}</p>
//     </div>
//   );
// };

// export default YourComponent;

import { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import withAuth from "../utils/withAuth";

const TrackingMap = () => {
  const getQueryParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedParam = urlParams.get(name);
    return encodedParam ? atob(encodedParam) : null;
  };

  const [areaData, setAreaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [areaId, setAreaId] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);

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
      } finally {
        setLoading(false);
      }
    };

    fetchAreaData();
  }, [areaId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          flex: "1",
          height: "100%",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <MapComponent
          areaData={areaData}
          driverId={driverId}
          vehicleId={vehicleId}
        />
      </div>
      <div
        style={{
          flex: "0 0 20%",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          margin: "10px",
        }}
      >
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
