import React, { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../../context/TeacherContext";
import * as api from "../../API/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddSubscriptionForm = () => {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("0");
  const { addSubscription, setBatches, batches, userData } = useContext(
    UserContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchBatches(userData.token);
        setBatches(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error");
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSubscription = {
        name,
        batch,
      };
      const response = await api.createSubscription(
        newSubscription,
        userData.token
      );
      if (response.data) {
        addSubscription(response.data);
        console.log(response.data);
        setName("");
        setBatch("");
        toast.success("Successfully created !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        alert("Failed");
        toast.error("Creation failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form className="p-1">
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Subscription Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter student name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Select Batch</Form.Label>
        <Form.Control
          as="select"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="0" disabled>
            Select batch
          </option>
          {batches &&
            batches.map((batch) => (
              <option value={batch._id}>{batch.name}</option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Button
          variant="success"
          size="lg"
          block
          type="submit"
          onClick={handleSubmit}
        >
          Add Subscription
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddSubscriptionForm;
