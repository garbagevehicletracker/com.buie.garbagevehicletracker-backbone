import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const YourComponent = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    // Connect to the server's socket.io instance
    const socket = io('https://garbage-tracking-backend.onrender.com/'); // Update this URL

    // Listen for 'connect' event
    socket.on('connect', () => {
      console.log('Socket connected successfully!');
    });

    // Listen for 'coordinatesUpdated' event
    socket.on('coordinatesUpdated', (updatedCoordinates) => {
      // Update the state with the new coordinates
      setCoordinates(updatedCoordinates);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
    <h1>Real-time Coordinates</h1>
    <p>Latitude: {coordinates.latitude}</p>
    <p>Longitude: {coordinates.longitude}</p>
  </div>
  );
};

export default YourComponent;
