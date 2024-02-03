// /frontend/src/components/MapComponent.jsx
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

// /frontend/src/components/MapComponent.jsx
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const MapComponent = ({ vehicleId }) => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const socket = io("https://garbage-tracking-backend.onrender.com/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected successfully!");
    });

    socket.on("coordinatesUpdated", (data) => {
      // Update coordinates only if they belong to the current user
      if (data.vehicleId === vehicleId) {
        setCoordinates({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [vehicleId]);

  const sendLocation = (position) => {
    const { latitude, longitude } = position.coords;
    console.log("Got Location Successfully!");

    // Emit a 'coordinatesUpdated' event to the server with vehicleId
    socket.emit("coordinatesUpdated", { vehicleId, latitude, longitude });

    // Update the display
    setCoordinates({ latitude, longitude });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendLocation);
    } else {
      console.error("Error: Geolocation not supported");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(getLocation, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Real-time Coordinates</h1>
      <p>Latitude: {coordinates.latitude}</p>
      <p>Longitude: {coordinates.longitude}</p>
    </div>
  );
};

MapComponent.propTypes = {
  vehicleId: PropTypes.string.isRequired,
};
export default MapComponent;
