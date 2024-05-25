import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import AddDriver from "./pages/AddDriver";
import AddVehicle from "./pages/AddVehicle";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import DriverVehicleDetails from "./pages/DriverVehicleDetails";
import TrackingMap from "./pages/TrackingMap";
import NavbarComponent from "./components/NavbarComponent";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Router>
      <NavbarComponent user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addVehicle" element={<AddVehicle />} />
        <Route path="/addDriver" element={<AddDriver />} />
        <Route path="/driver-vehicle-details" element={<DriverVehicleDetails />} />
        <Route path="/tracking-details" element={<TrackingMap />} />
      </Routes>
    </Router>
  );
};

export default App;
