import { useEffect, useState } from "react";
import "../styles/home.css";

const ProfilesSection = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://garbage-collect-backend.onrender.com/get-all-assigned-work")
      .then((response) => response.json())
      .then((data) => {
        fetchDriverAndAreaData(data);
      })
      .catch((error) =>
        console.error("Error fetching assigned work data:", error)
      );
  };

  const fetchDriverAndAreaData = (assignedWorkData) => {
    fetch("https://garbage-collect-backend.onrender.com/get-driver")
      .then((response) => response.json())
      .then((driverData) => {
        fetch("https://garbage-collect-backend.onrender.com/get-all-areas")
          .then((response) => response.json())
          .then((areaData) => {
            let profiles = [];
            assignedWorkData.forEach((work) => {
              const correspondingDriver = driverData.find(
                (driver) => driver.driverId === work.driverId
              );
              const correspondingArea = areaData.find(
                (area) => area.areaId === work.areaId
              );
              if (correspondingDriver) {
                profiles.push({
                  vehicleId: work.vehicleId,
                  driverName: correspondingDriver.name,
                  areaName: correspondingArea.name,
                  driverImage: correspondingDriver.image,
                });
              }
            });
            setProfiles(profiles);
          })
          .catch((error) => console.error("Error fetching area data:", error));
      })
      .catch((error) => console.error("Error fetching driver data:", error));
  };

  return (
    <section className="profiles" id="profilesSection">
      <h2>Profiles</h2>
      <ul></ul>
    </section>
  );
};

export default ProfilesSection;
