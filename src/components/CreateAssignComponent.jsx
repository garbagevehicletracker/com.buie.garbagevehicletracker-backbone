import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/AssignForm.css";

const CreateAssignComponent = ({
  area,
  drivers,
  vehicles,
  selectedAssign,
  onDeleteAssign,
}) => {
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    if (selectedAssign) {
      setSelectedDriver(selectedAssign.driverId);
      setSelectedVehicle(selectedAssign.vehicleId);
    }
  }, [selectedAssign]);

  useEffect(() => {
    let submitSuccessTimer;
    if (submitSuccess) {
      submitSuccessTimer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000); // Hide message after 5 seconds
    }

    let deleteSuccessTimer;
    if (deleteSuccess) {
      deleteSuccessTimer = setTimeout(() => {
        setDeleteSuccess(false);
      }, 5000); // Hide message after 5 seconds
    }

    return () => {
      clearTimeout(submitSuccessTimer);
      clearTimeout(deleteSuccessTimer);
    };
  }, [submitSuccess, deleteSuccess]);

  const handleDriverChange = (event) => {
    const selectedDriverId = event.target.value;
    setSelectedDriver(selectedDriverId);
  };

  const handleVehicleChange = (event) => {
    const selectedVehicleId = event.target.value;
    setSelectedVehicle(selectedVehicleId);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const data = {
      areaId: area._id,
      driverId: selectedDriver,
      vehicleId: selectedVehicle,
    };

    setIsSubmitting(true);

    fetch("/api/work/create-assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        setSubmitSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");
  
    setIsSubmitting(true); // Set loading state
  
    fetch(
      `https://garbage-tracking-backend.onrender.com/work/delete-assign/${selectedAssign._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setDeleteSuccess(true);
          onDeleteAssign(selectedAssign._id);
          setSelectedDriver("");
          setSelectedVehicle("");
        } else {
          throw new Error("Failed to delete assignment");
        }
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error); // Log the error
        // Handle the error if needed
      })
      .finally(() => {
        setIsSubmitting(false); // Reset loading state
      });
  };
  

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "100%", height: "30%" }}>
        <div className="card-body">
          <p
            className="card-text"
            style={{ color: "#247226", fontSize: "24px", fontWeight: "bold" }}
          >
            {" "}
            Area: {area.name}
          </p>
          <label htmlFor="driver" className="form-label">
            Select Driver:
          </label>
          <select
            id="driver"
            className="form-select"
            value={selectedDriver}
            onChange={handleDriverChange}
          >
            <option value="" disabled>
              Select a driver
            </option>
            {drivers.map((d) => (
              <option
                key={d._id}
                value={d._id}
                disabled={
                  (!d.isAvailable && selectedDriver !== d._id) ||
                  (selectedAssign && selectedAssign.driverId === d._id)
                }
              >
                {d.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="vehicle" className="form-label">
            Select Vehicle:
          </label>
          <select
            id="vehicle"
            className="form-select"
            value={selectedVehicle}
            onChange={handleVehicleChange}
          >
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicles.map((v) => (
              <option
                key={v._id}
                value={v._id}
                disabled={
                  (!v.isAvailable && selectedVehicle !== v._id) ||
                  (selectedAssign && selectedAssign.vehicleId === v._id)
                }
              >
                {v.vehicleId}
              </option>
            ))}
          </select>
          <br />
          <button
            className="btn btn-success px-4 py-2 mt-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
          <button
            className="btn btn-danger px-4 py-2 mt-2 ms-2"
            onClick={handleDelete}
            disabled={!selectedAssign || isSubmitting} // Disable button during submission
          >
            Delete
          </button>

          <div className={`message ${submitSuccess ? "success" : ""}`}>
            {submitSuccess && <p>Assignment submitted successfully!</p>}
          </div>
          <div className={`message ${deleteSuccess ? "success" : ""}`}>
            {deleteSuccess && <p>Assignment deleted successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

CreateAssignComponent.propTypes = {
  area: PropTypes.object.isRequired,
  drivers: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  selectedAssign: PropTypes.object,
  onDeleteAssign: PropTypes.func.isRequired,
};

export default CreateAssignComponent;
