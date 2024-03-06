import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import withAuth from '../utils/withAuth';
const AddDriver = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    driverId: '',
    phoneNumbers: '',
    gender: 'male',
    age: '',
    image: '',
  });

  const handleCloseClick = () => {
    navigate("/admin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if all required fields are filled out
    if (!formData.name || !formData.driverId || !formData.phoneNumbers || !formData.age || !formData.image) {
      alert('Please fill out all required fields.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/drivers/create-driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // Handle success as needed
      } else {
        console.error('Error submitting data');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required // Make the field required
              />
            </Form.Group>

            <Form.Group controlId="formDriverId">
              <Form.Label>Driver ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Driver ID"
                value={formData.driverId}
                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                required // Make the field required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumbers">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={formData.phoneNumbers}
                onChange={(e) => setFormData({ ...formData, phoneNumbers: e.target.value })}
                required // Make the field required
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Male"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={() => setFormData({ ...formData, gender: 'male' })}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={() => setFormData({ ...formData, gender: 'female' })}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required // Make the field required
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Photograph URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photograph URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required // Make the field required
              />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
            <Button variant="secondary" onClick={handleCloseClick}>Close</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
const AddDriverWithAuth = withAuth(AddDriver);
export default AddDriverWithAuth;

// import { motion } from "framer-motion"; // Import motion for animations
// import { useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "../styles/AddDriver.css"; // Import custom CSS for component styling
// import withAuth from "../utils/withAuth";

// const AddDriver = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     driverId: "",
//     phoneNumbers: "",
//     gender: "male",
//     age: "",
//     image: "",
//   });

//   const handleCloseClick = () => {
//     navigate("/admin");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Check if all required fields are filled out
//     if (
//       !formData.name ||
//       !formData.driverId ||
//       !formData.phoneNumbers ||
//       !formData.age ||
//       !formData.image
//     ) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(
//         "http://52.63.51.138:5500/drivers/create-driver",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         console.log("Data submitted successfully");
//         // Handle success as needed
//       } else {
//         console.error("Error submitting data");
//         // Handle error as needed
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error as needed
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <motion.Form // Apply animation to Form component
//             onSubmit={handleSubmit}
//             initial={{ opacity: 0, y: -50 }} // Initial animation state
//             animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
//             transition={{ duration: 0.5 }} // Transition duration
//             className="your-component-form" // Apply custom CSS class for styling
//           >
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required // Make the field required
//               />
//             </Form.Group>

//             <Form.Group controlId="formDriverId">
//               <Form.Label>Driver ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Driver ID"
//                 value={formData.driverId}
//                 onChange={(e) =>
//                   setFormData({ ...formData, driverId: e.target.value })
//                 }
//                 required // Make the field required
//               />
//             </Form.Group>

//             <Form.Group controlId="formPhoneNumbers">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Phone Number"
//                 value={formData.phoneNumbers}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phoneNumbers: e.target.value })
//                 }
//                 required // Make the field required
//               />
//             </Form.Group>

//             <Form.Group controlId="formGender">
//               <Form.Label>Gender</Form.Label>
//               <div>
//                 <Form.Check
//                   type="radio"
//                   label="Male"
//                   value="male"
//                   checked={formData.gender === "male"}
//                   onChange={() => setFormData({ ...formData, gender: "male" })}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="Female"
//                   value="female"
//                   checked={formData.gender === "female"}
//                   onChange={() =>
//                     setFormData({ ...formData, gender: "female" })
//                   }
//                 />
//               </div>
//             </Form.Group>

//             <Form.Group controlId="formAge">
//               <Form.Label>Age</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Age"
//                 value={formData.age}
//                 onChange={(e) =>
//                   setFormData({ ...formData, age: e.target.value })
//                 }
//                 required // Make the field required
//               />
//             </Form.Group>

//             <Form.Group controlId="formImage">
//               <Form.Label>Photograph URL</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Photograph URL"
//                 value={formData.image}
//                 onChange={(e) =>
//                   setFormData({ ...formData, image: e.target.value })
//                 }
//                 required // Make the field required
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//             <Button variant="secondary" onClick={handleCloseClick}>
//               Close
//             </Button>
//           </motion.Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// const AddDriverWithAuth = withAuth(AddDriver);
// export default AddDriverWithAuth;
