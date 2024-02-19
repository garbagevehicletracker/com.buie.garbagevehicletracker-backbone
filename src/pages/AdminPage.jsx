import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AssignForm from "../components/AssignForm";

const App = () => {
  // State to store data from APIs
  const [areas, setAreas] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetching data from APIs
    const fetchAreas = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://garbage-tracking-backend.onrender.com/areas/get-all-areas/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAreas(data);
    };

    const fetchDrivers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://garbage-tracking-backend.onrender.com/drivers/get-all-drivers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setDrivers(data);
    };

    const fetchVehicles = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://garbage-tracking-backend.onrender.com/vehicles/get-vehicles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setVehicles(data);
    };

    // Call the fetch functions
    fetchAreas();
    fetchDrivers();
    fetchVehicles();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center bg-light overflow-x-hidden m-0 p-3 min-vh-100">
      <Container fluid className="p-0 d-flex flex-column flex-grow-1">
        <Row>
          <Col
            xl={12}
            className="position-relative overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            <h2 className="mb-4">Future Section</h2>
            <Card className="bg-light my-4 p-4">
              {areas.map((area) => (
                <AssignForm
                  key={area._id}
                  area={area}
                  driver={drivers}
                  vehicle={vehicles}
                />
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="d-flex flex-row gap-4 justify-content-around w-100 position-fixed bottom-0 p-2 bg-light" style={{ zIndex: 1 }}>
        <Col>
          <Button variant="primary" className="w-100 p-2">
            Add Driver
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" className="w-100 p-2">
            Add Vehicle
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" className="w-100 p-2">
            Next
          </Button>
        </Col>
      </div>
    </div>
  );
};

export default App;
