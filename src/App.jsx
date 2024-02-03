// import React from "react";
import MapComponent from "./components/MapComponent";

const App = () => {
  const vehicles = [
    { vehicleId: "123456", name: "Scorpio" },
    // { vehicleId: "1234567", name: "Omni" },
    // Add more vehicles as needed
  ];
  return (
    <div>
      <h1>Your App</h1>
      {vehicles.map((vehicle) => (
        <MapComponent key={vehicle.vehicleId} vehicleId={vehicle.vehicleId} />
      ))}

      {/* Other components */}
    </div>
  );
};

export default App;
