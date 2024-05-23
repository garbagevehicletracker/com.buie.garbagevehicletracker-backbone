import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateAssignComponent from "../components/CreateAssignComponent";
import CreateAssignComponentSkeleton from "../components/CreateAssignComponentSkeleton";
import AddDriver from "./AddDriver"; // Import AddDriver component
import AddVehicle from "./AddVehicle"; // Import VehicleForm component
import withAuth from "../utils/withAuth";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

const AdminPage = () => {
  const [areas, setAreas] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedAssigns, setSelectedAssigns] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const navigate = useNavigate();

  const handleAddDriverClick = () => {
    setShowAddDriverModal(true);
  };

  const handleAddDriverClose = () => {
    setShowAddDriverModal(false);
  };

  const handleAddVehicleClick = () => {
    setShowAddVehicleModal(true);
  };

  const handleAddVehicleClose = () => {
    setShowAddVehicleModal(false);
  };

  const handleNextClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAllData = async () => {
      await fetchData("https://garbage-tracking-backend.onrender.com/areas/get-all-areas/", setAreas);
      await fetchData("https://garbage-tracking-backend.onrender.com/drivers/get-all-drivers", setDrivers);
      await fetchData("https://garbage-tracking-backend.onrender.com/vehicles/get-vehicles", setVehicles);

      // Fetch selected assigns for each area
      areas.forEach(async (area) => {
        await fetchData(
          `https://garbage-tracking-backend.onrender.com/work/get-all-assigns/${area._id}`,
          (data) => {
            setSelectedAssigns((prevAssigns) => ({
              ...prevAssigns,
              [area._id]: data,
            }));
          }
        );
      });

      setLoading(false); // Set loading to false after data is fetched
    };

    fetchAllData();
  }, [areas]);

  const handleDeleteAssign = (assignId) => {
    // Define your logic here to delete the assignment
    console.log("Deleting assignment with ID:", assignId);

    // Update selectedAssigns state after deleting the assignment
    setSelectedAssigns((prevAssigns) => {
      const updatedAssigns = { ...prevAssigns };
      Object.keys(updatedAssigns).forEach((areaId) => {
        updatedAssigns[areaId] = Array.isArray(updatedAssigns[areaId])
          ? updatedAssigns[areaId].filter((assign) => assign._id !== assignId)
          : [];
      });
      return updatedAssigns;
    });
  };

  return (
    <div className="d-flex flex-column align-items-center bg-light overflow-x-hidden m-0 p-3 min-vh-90">
      <Container fluid className="p-0 d-flex flex-column flex-grow-1">
        <Row>
          <Col
            xl={12}
            className="position-relative overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            <h2 className="mb-4" style={{ color: "#247226" }}>
              Driver and Vehicle Section
            </h2>
            <Card className="bg-light my-4 p-4">
              {loading ? (
                // Skeleton loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <CreateAssignComponentSkeleton key={index} />
                ))
              ) : (
                areas.map((area) => (
                  <motion.div
                    key={area._id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="animated-item"
                  >
                    <CreateAssignComponent
                      area={area}
                      drivers={drivers}
                      vehicles={vehicles}
                      selectedAssign={selectedAssigns[area._id]}
                      onDeleteAssign={handleDeleteAssign}
                    />
                  </motion.div>
                ))
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <motion.div
        className="d-flex flex-row gap-4 justify-content-around w-100 position-fixed bottom-0 p-2 bg-light"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Col>
          <Button
            variant="success"
            className="w-100 p-2"
            onClick={handleAddDriverClick}
          >
            Add Driver
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            className="w-100 p-2"
            onClick={handleAddVehicleClick}
          >
            Add Vehicle
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            className="w-100 p-2"
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Col>
      </motion.div>

      <Modal show={showAddDriverModal} onHide={handleAddDriverClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Add Driver</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <AddDriver onClose={handleAddDriverClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showAddVehicleModal} onHide={handleAddVehicleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Add Vehicle</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <AddVehicle onHide={handleAddVehicleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

const AdminPageWithAuth = withAuth(AdminPage);
export default AdminPageWithAuth;
