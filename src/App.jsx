import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/" element={<DashboardPage />} /> */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
