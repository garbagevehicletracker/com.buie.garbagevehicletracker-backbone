import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
