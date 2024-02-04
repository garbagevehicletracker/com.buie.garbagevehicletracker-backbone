import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignComponent from "../components/AssignComponent";

const AdminPage = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        const response = await axios.get(
          "https://garbage-tracking-backend.onrender.com/areas/get-all-areas/",
          {
            headers: {
              // Include the retrieved token in the Authorization header
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {areas.map((area) => (
        <AssignComponent
          key={area._id}
          areaId={area.areaId}
          areaName={area.name}
          vehicles="Maruti"
          drivers="Rahul"
        />
      ))}
    </div>
  );
};

export default AdminPage;
