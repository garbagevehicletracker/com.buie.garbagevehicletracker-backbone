import { useState, useEffect } from 'react';
import ShowDetailsComponent from "../components/ShowDetailsComponent";
import ShowDetailsComponentSkeleton from "../components/ShowDetailsComponentSkeleton";
import NotificationComponent from "../components/NotificationComponent";
import "../styles/Dashboard.css";
import withAuth from '../utils/withAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const notiDivStyle = {
    height: '80vh',
    overflowY: 'scroll', 
  };

  const fetchProfiles = async () => {
    const authToken = getAuthToken();
    if (!authToken) return;

    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };


    try {
      const response = await fetch('https://garbage-tracking-backend.onrender.com/work/get-all-assigns', {
        method: 'GET',
        headers: headers
      });
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    const authToken = getAuthToken();
    if (!authToken) return;

    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch('https://garbage-tracking-backend.onrender.com/updates/notifications', {
        method: 'GET',
        headers: headers
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchProfiles(); // Fetch profiles initially

    const intervalId = setInterval(fetchNotifications, 5000); // Fetch notifications every 5 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear the interval on unmount
  }, []); // Empty dependency array to run only once on mount

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <div className="dashboard-container overflow-hidden position-relative">
      <button className="toggle-sidebar-button" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : <FontAwesomeIcon icon={faBell} />}
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className='mt-5'>Notifications</h2>
        <div style={notiDivStyle}>
          {loadingNotifications
            ? <p>Loading notifications...</p>
            : notifications.map(notification => (
              <NotificationComponent
                key={notification._id}
                message={notification.message}
              />
            ))}
        </div>
      </div>
      <div className="row m-5">
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
