import { useState, useEffect } from 'react';
import ShowDetailsComponent from "../components/ShowDetailsComponent";
import ShowDetailsComponentSkeleton from "../components/ShowDetailsComponentSkeleton";
import "../styles/Dashboard.css";
import withAuth from '../utils/withAuth';

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = getAuthToken();
    if (authToken) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      };

      fetch('https://garbage-tracking-backend.onrender.com/work/get-all-assigns', {
        method: 'GET',
        headers: headers
      })
        .then(response => response.json())
        .then(data => {
          setProfiles(data);
        })
        .catch(error => console.error('Error fetching profiles:', error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <div className="dashboard-container">
      <div className="row m-5">
        <div className="col-md-6">
          <section className="notification mb-4">
            <h2>Notifications</h2>
            {/* Add your notifications content here */}
          </section>
        </div>
        <div className="col-md-6">
          <section className="profiles mb-4">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <ShowDetailsComponentSkeleton key={index} />
                ))
              : profiles.map(profile => (
                  <ShowDetailsComponent
                    key={profile._id}
                    areaId={profile.areaId}
                    driverId={profile.driverId}
                    vehicleId={profile.vehicleId}
                  />
                ))}
          </section>
        </div>
      </div>
    </div>
  );
};

const DashboardWithAuth = withAuth(Dashboard);

export default DashboardWithAuth;
