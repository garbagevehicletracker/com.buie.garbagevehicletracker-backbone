import React from 'react';
import NotificationSection from '../components/NotificationSection';
import ProfilesSection from '../components/ProfilesSection';
import "../styles/home.css"


const Dashboard = () => {
    return (
        <div>
            <h1>Municipality Garbage Vehicle Monitoring System</h1>
            <div className="container">
                <section className="notification" id="notificationSection">
                    <h2>Notifications</h2>
                    <ul>

                    </ul>
                </section>
                <section className="profiles" id="profilesSection">
                    <h2>Profiles</h2>
                    <ul>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
