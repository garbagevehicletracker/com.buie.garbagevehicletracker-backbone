// import React from "react";
// import "../styles/home.css";
import withAuth from "../utils/withAuth";
const Dashboard = () => {
  return (
    <div>
      <div className="container">
        <section className="notification" id="notificationSection">
          <h2>Notifications</h2>
          <ul></ul>
        </section>
        <section className="profiles" id="profilesSection">
          <h2>Profiles</h2>
          <ul></ul>
        </section>
      </div>
    </div>
  );
};

const DashboardWithAuth = withAuth(Dashboard);

export default DashboardWithAuth ;
