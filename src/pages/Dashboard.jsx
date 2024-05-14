// import React from "react";
// import "../styles/home.css";
// import { Button } from "bootstrap";
// import { useNavigate } from "react-router-dom";
import withAuth from "../utils/withAuth";
const Dashboard = () => {
  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate("/driver-vehicle-Details");
  // };
  return (
    <div>
      <div className="container">
        <section className="notification" id="notificationSection">
          <h2>Notifications</h2>
          <ul></ul>
        </section>
        <section className="profiles" id="profilesSection">
          <h2>Profiles</h2>
          <ul>
            <button >Show details</button>
          </ul>
        </section>
      </div>
    </div>
  );
};

const DashboardWithAuth = withAuth(Dashboard);

export default DashboardWithAuth;
