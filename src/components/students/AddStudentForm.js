import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../../context/TeacherContext";
import * as api from "../../API/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudentForm = () => {
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");
  const [batch, setBatch] = useState("0");
  const [password, setPassword] = useState("");
  const { students, addStudent, setBatches, batches, userData } = useContext(
    UserContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchBatches(userData.token);
        setBatches(response.data);
        //console.log(response.data);
      } catch (error) {
        //console.log("Error");
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newStudent = {
        name,
        batch,
        password,
        indexNo: index,
      };
      const response = await api.createStudent(newStudent, userData.token);
      // //console.log(response.data.indexNo);
      if (response.data) {
        addStudent(response.data);
        // //console.log(students);
        setName("");
        setBatch("");
        setPassword("");
        setIndex("");
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
        alert("Filed");
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

      // //console.log(response);
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <Form className="p-1">
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Index</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter student index here"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          maxLength="6"
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Student Name</Form.Label>
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
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Set password</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Button
          variant="success"
          size="lg"
          block
          type="submit"
          onClick={handleSubmit}
        >
          Add student
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddStudentForm;
