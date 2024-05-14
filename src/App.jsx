import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import AddDriver from "./pages/AddDriver";
import AddVehicle from "./pages/AddVehicle";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import DriverVehicleDetails from "./pages/DriverVehicleDetails";
import TrackingMap from "./components/TrackingMap";
import NavbarComponent from "./components/NavbarComponent"

const App = () => {
  const [user, setUser] = useState(null);

  // Function to retrieve user data from wherever it's stored
  const getUserData = () => {
    // Example: retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };

  // Set initial user data on component mount
  useState(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <Router>
      <NavbarComponent user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addVehicle" element={<AddVehicle />} />
        <Route path="/addDriver" element={<AddDriver />} />
        <Route path="/driver-vehicle-details" element={<DriverVehicleDetails />} />
        <Route path="/tracking" element={<TrackingMap />} />
      </Routes>
    </Router>
  );
};

export default App;
