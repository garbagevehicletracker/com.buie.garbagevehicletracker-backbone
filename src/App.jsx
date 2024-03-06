import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddDriver from "./pages/AddDriver";
import AddVehicle from "./pages/AddVehicle";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/addVehicle" element={<AddVehicle />} />
        <Route path="/addDriver" element={<AddDriver />} />
      </Routes>
    </Router>
  );
};

export default App;
