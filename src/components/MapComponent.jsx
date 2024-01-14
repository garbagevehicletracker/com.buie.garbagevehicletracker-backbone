import  { useEffect, useState } from 'react';
import io from 'socket.io-client';

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const socket = io('http://localhost:5500'); // Change the URL to match your server

    socket.on('coordinatesUpdated', (data) => {
      setCoordinates(data);
    });

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

export default MapComponent;
