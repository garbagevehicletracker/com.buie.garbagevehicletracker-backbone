import { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import withAuth from "../utils/withAuth";
// import CryptoJS from 'crypto-js';

const FormBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  background-color: #f8f9fa;
`;

const ContainerStyled = styled(Container)`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const FormStyled = styled(Form)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto; /* Center the form */
`;

const LabelStyled = styled(Form.Label)`
  font-weight: bold;
  color: black; /* Change the color to black */
`;

const InputStyled = styled(Form.Control)`
  border-radius: 0.25rem;
`;

const ButtonStyled = styled(Button)`
  margin-top: 1rem;
  margin-right: 1rem;

  &.submit-button {
    background-color: green; /* Change the submit button color to green */
    border: none;

    &:hover {
      background-color: darkgreen; /* Darken the color on hover */
    }
  }
`;

const HeadingStyled = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  color: green; /* Change the color to green */
`;

const CustomRadioWrapper = styled.div`
  display: flex;
  gap: 1rem;

  .form-check-input:checked {
    background-color: green;
    border-color: green;
  }

  .form-check-input {
    border-radius: 50%;
  }

  .form-check-label {
    margin-left: 0.5rem;
  }
`;

// eslint-disable-next-line react/prop-types
const AddDriver = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    driverId: "",
    phoneNumbers: "",
    gender: "male",
    age: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleCloseClick = () => {
    if (onClose) onClose();
    navigate("/admin");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud"); // replace with your actual upload preset if needed

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/diukwdy4w/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.driverId ||
      !formData.phoneNumbers ||
      !formData.age ||
      !file
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const imageUrl = await uploadImage(file);

      if (!imageUrl) {
        alert("Error uploading image. Please try again.");
        setLoading(false);
        return;
      }

      const newFormData = { ...formData, image: imageUrl };
      console.log(newFormData);
      const response = await fetch(
        "https://garbage-tracking-backend.onrender.com/drivers/create-driver",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newFormData),
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully");
        handleCloseClick();
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBody>
      <ContainerStyled>
        {loading && (
          <div className="spinner-overlay">
            <Spinner animation="border" role="status" variant="success">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <FormStyled onSubmit={handleSubmit}>
          <HeadingStyled>Add Driver</HeadingStyled>

          <Form.Group controlId="formName" className="mb-3">
            <LabelStyled>Name</LabelStyled>
            <InputStyled
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formDriverId" className="mb-3">
            <LabelStyled>Driver ID</LabelStyled>
            <InputStyled
              type="text"
              placeholder="Enter Driver ID"
              value={formData.driverId}
              onChange={(e) =>
                setFormData({ ...formData, driverId: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumbers" className="mb-3">
            <LabelStyled>Phone Number</LabelStyled>
            <InputStyled
              type="text"
              placeholder="Enter Phone Number"
              value={formData.phoneNumbers}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumbers: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formGender" className="mb-3">
            <LabelStyled>Gender</LabelStyled>
            <CustomRadioWrapper>
              <Form.Check
                type="radio"
                label="Male"
                value="male"
                checked={formData.gender === "male"}
                onChange={() => setFormData({ ...formData, gender: "male" })}
              />
              <Form.Check
                type="radio"
                label="Female"
                value="female"
                checked={formData.gender === "female"}
                onChange={() => setFormData({ ...formData, gender: "female" })}
              />
            </CustomRadioWrapper>
          </Form.Group>

          <Form.Group controlId="formAge" className="mb-3">
            <LabelStyled>Age</LabelStyled>
            <InputStyled
              type="number"
              placeholder="Enter Age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formImage" className="mb-3">
            <LabelStyled>Photograph</LabelStyled>
            <InputStyled type="file" onChange={handleFileChange} required />
          </Form.Group>

          <div className="text-center">
            <ButtonStyled
              variant="primary"
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </ButtonStyled>
            {/* <ButtonStyled variant="secondary" onClick={handleCloseClick} disabled={loading}>
              Close
            </ButtonStyled> */}
          </div>
        </FormStyled>
      </ContainerStyled>
    </FormBody>
  );
};

const AddDriverWithAuth = withAuth(AddDriver);
export default AddDriverWithAuth;
