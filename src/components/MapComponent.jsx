import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import withAuth from "../utils/withAuth";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const MapComponent = ({ areaData, driverId, vehicleId }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC8rsCM1PxiuuyL7FdtvXimGMSR-0dtkB0",
  });

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [center, setCenter] = useState({
    lat: 23.0654247,
    lng: 87.3026587,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://garbage-tracking-backend.onrender.com/dustbins/get-middleCoordinates/${areaData.areaId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch predefined points");
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debug: Log the fetched data

        const markersData = data.map((point) => ({
          lat: point.middleCoordinates.latitude,
          lng: point.middleCoordinates.longitude,
        }));
        console.log("Markers Data:", markersData); // Debug: Log the markers data

        setMarkers(markersData);

        // Set center dynamically
        if (data.length > 0) {
          const firstMarker = data[0].middleCoordinates;
          setCenter({ lat: firstMarker.latitude, lng: firstMarker.longitude });
        }
      } catch (error) {
        console.error("Error fetching predefined points:", error);
      }
    };

    fetchCoordinates();
  }, [areaData]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((position, index) => (
        <Marker
          key={index}
          position={position}
          onClick={() => handleMarkerClick(position)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h1>Marker Info</h1>
            <p>Area Name: {areaData.name}</p>
            <p>This is the info window text for the marker.</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
};

MapComponent.propTypes = {
  areaData: PropTypes.shape({
    areaId: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(
      PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      })
    ),
    name: PropTypes.string.isRequired,
  }).isRequired,
  driverId: PropTypes.string.isRequired,
  vehicleId: PropTypes.string.isRequired,
};

const MapComponentWithAuth = withAuth(MapComponent);
export default MapComponentWithAuth;
