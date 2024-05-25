
// // Path: src/pages/TrackingMap.jsx
// // TrackingMap.js
// import  { useEffect, useState } from "react";
// import MapComponent from "../components/MapComponent";
// import withAuth from "../utils/withAuth";
// import Skeleton from "../components/Skeleton";

// const TrackingMap = () => {
//   const getQueryParameter = (name) => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const encodedParam = urlParams.get(name);
//     // return encodedParam ? atob(encodedParam) : null;
//     return encodedParam;
//   };

//   const [areaData, setAreaData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [areaId, setAreaId] = useState(null);
//   const [driverId, setDriverId] = useState(null);
//   const [vehicleId, setVehicleId] = useState(null);

//   useEffect(() => {
//     const areaId = getQueryParameter("areaId");
//     setAreaId(areaId);
//     const driverId = getQueryParameter("driverId");
//     setDriverId(driverId);
//     const vehicleId = getQueryParameter("vehicleId");
//     setVehicleId(vehicleId);

//     const fetchAreaData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found");
//         }

//         const response = await fetch(
//           `https://garbage-tracking-backend.onrender.com/areas/get-area-details/${areaId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch area details");
//         }

//         const data = await response.json();
//         setAreaData(data);
//       } catch (error) {
//         console.error("Error fetching area data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (areaId) {
//       fetchAreaData();
//     } else {
//       setError("Invalid area ID");
//       setLoading(false);
//     }
//   }, [areaId]);

//   if (loading) {
//     return <Skeleton />;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div style={{ display: "flex", height: "100%" }}>
//       <div
//         style={{
//           flex: "1",
//           height: "100%",
//           overflow: "hidden",
//           padding: "10px",
//         }}
//       >
//         <MapComponent
//           areaData={areaData}
//           driverId={driverId}
//           vehicleId={vehicleId}
//         />
//       </div>
//       <div
//         style={{
//           flex: "0 0 20%",
//           backgroundColor: "#f0f0f0",
//           padding: "20px",
//           margin: "10px",
//         }}
//       >
//         <h2>Header Text</h2>
//         <p>This is the side content.</p>
//         <div>
//           <h3>Decoded Parameters</h3>
//           <p>Area ID: {areaId}</p>
//           <p>Driver ID: {driverId}</p>
//           <p>Vehicle ID: {vehicleId}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TrackingMapWithAuth = withAuth(TrackingMap);

// export default TrackingMapWithAuth;


import React from 'react'

const TrackingMap = () => {
  return (
    <div>TrackingMap</div>
  )
}

export default TrackingMap

