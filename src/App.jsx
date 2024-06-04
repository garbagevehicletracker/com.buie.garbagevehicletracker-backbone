import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import DriverVehicleDetails from "./pages/DriverVehicleDetails";
import RegisterForm from "./pages/RegisterForm";
import TrackingMap from "./pages/TrackingMap";
import NavbarComponent from "./components/NavbarComponent";
import NotFound from "./pages/NotFound";

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
        <Route path="/register" element={<RegisterForm setUser={setUser} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/driver-vehicle-details" element={<DriverVehicleDetails />} />
        <Route path="/tracking" element={<TrackingMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
