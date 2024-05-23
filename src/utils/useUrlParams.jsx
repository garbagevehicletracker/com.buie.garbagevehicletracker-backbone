// import { useEffect, useState } from 'react';

// // Utility function to decode Base64
// const decodeBase64 = (encodedString) => {
//   try {
//     return atob(encodedString);
//   } catch (error) {
//     console.error('Error decoding Base64 string:', error);
//     return null;
//   }
// };

// const useUrlParams = () => {
//   const [params, setParams] = useState({ areaId: '', driverId: '', vehicleId: '' });

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const encodedAreaId = urlParams.get('areaId');
//     const encodedDriverId = urlParams.get('driverId');
//     const encodedVehicleId = urlParams.get('vehicleId');

//     if (encodedAreaId && encodedDriverId && encodedVehicleId) {
//       const areaId = decodeBase64(encodedAreaId);
//       const driverId = decodeBase64(encodedDriverId);
//       const vehicleId = decodeBase64(encodedVehicleId);

//       setParams({ areaId, driverId, vehicleId });
//     }
//   }, []);

//   return params;
// };

// export default useUrlParams;


// use for future reference
