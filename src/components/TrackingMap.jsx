import  { useEffect, useState } from 'react';

const TrackingMap = () => {
  const [map, setMap] = useState(null);
  const [trackingPin, setTrackingPin] = useState(null);

  // Function to initialize Google Maps
  const initMap = () => {
    const mapOptions = {
      zoom: 18,
      center: { lat: 23.219658,  lng: 87.059892 } // Initial center
    };
    const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    setMap(newMap);
  };

  // Function to add a marker to the map
  const addMarker = (position, icon = null) => {
    if (!map) return;
    new window.google.maps.Marker({
      position,
      map,
      icon
    });
  };

  // Function to update live tracking pin
  const updateLiveTracking = (coordinates) => {
    if (!map) return;
    if (trackingPin) {
      trackingPin.setPosition(coordinates);
    } else {
      const pin = new window.google.maps.Marker({
        position: coordinates,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: 'blue',
          fillOpacity: 1,
          strokeWeight: 1
        }
      });
      setTrackingPin(pin);
    }
    map.panTo(coordinates);
  };

  useEffect(() => {
    const fetchPredefinedPoints = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch predefined points from the API
        const response = await fetch('https://garbage-tracking-backend.onrender.com/dustbins/get-middleCoordinates/4241', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Replace YOUR_JWT_TOKEN with your actual JWT token
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch predefined points');
        }
        const data = await response.json();
        // Add predefined points to the map
        data.forEach(point => {
          addMarker({ lat: point.middleCoordinates.latitude, lng: point.middleCoordinates.longitude });
        });
      } catch (error) {
        console.error('Error fetching predefined points:', error);
      }
    };

    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC8rsCM1PxiuuyL7FdtvXimGMSR-0dtkB0&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);

    // Fetch predefined points and clean up
    fetchPredefinedPoints();
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}>
      {/* Google Map will be rendered here */}
    </div>
  );
};

export default TrackingMap;
