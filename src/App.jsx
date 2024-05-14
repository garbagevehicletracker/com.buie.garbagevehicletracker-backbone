import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddDriver from "./pages/AddDriver";
import AddVehicle from "./pages/AddVehicle";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import DriverVehicleDetails from "./pages/DriverVehicleDetails";
import TrackingMap from "./components/TrackingMap";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addVehicle" element={<AddVehicle />} />
        <Route path="/addDriver" element={<AddDriver />} />
        <Route path="/driver-vehicle-Details" element={<DriverVehicleDetails />} />
        <Route path="/tracking" element={<TrackingMap />} />
      </Routes>
    </Router>
  );
};

export default App;
