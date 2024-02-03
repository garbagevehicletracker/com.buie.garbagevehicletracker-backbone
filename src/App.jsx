import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={LoginForm} />
      </Routes>
    </Router>
  );
};

export default App;
