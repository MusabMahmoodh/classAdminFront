import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import UserContext from "../../context/TeacherContext";
import * as api from "../../API/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordReset from "./PasswordReset";
const UpdateStudent = () => {
  let history = useHistory();
  const { id } = useParams();
  const { addStudent, batches, setBatches, userData } = useContext(UserContext);
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");
  const [batch, setBatch] = useState("select batch");
  const [password, setPassword] = useState("");
  // console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.fetchStudent(id, userData.token);
        const response = await api.fetchBatches(userData.token);
        setBatches(response.data);
        // console.log(response.data);
        // console.log(res.data);
        setName(res.data.name);
        setIndex(res.data.indexNo);
        setBatch(res.data.batch.name);
        // setPassword(res.data.password);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedStudent = {
        name,
        batch,
        password,
        indexNo: index,
      };
      const response = await api.updateStudent(
        id,
        updatedStudent,
        userData.token
      );

      if (response.data) {
        history.push("/students");
        toast.success("Successfully updated !", {
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
        toast.error("Updating failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      //   console.log(response.data.data);
    } catch (error) {
      console.log(error);
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
      <PasswordReset setPassword={setPassword} />
      <Form.Group>
        <Button
          variant="success"
          size="lg"
          block
          type="submit"
          onClick={handleSubmit}
        >
          Update Student details
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UpdateStudent;
