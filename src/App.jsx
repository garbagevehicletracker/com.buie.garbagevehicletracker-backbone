import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import AdminPage from "./pages/AdminPage";
// import AddVehicle from "./pages/AddVehicle";
import AddDriver from "./pages/AddDriver";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginForm />} /> */}
        {/* <Route path="/" element={<DashboardPage />} /> */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        {/* <Route path="/addvehicle" element={<AddVehicle />} /> */}
        <Route path="/adddriver" element={<AddDriver />} />

      </Routes>
    </Router>
  );
};

export default App;
