import React, { useContext, useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import UserContext from "../../context/TeacherContext";
import * as api from "../../API/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddBatch = () => {
  const [name, setName] = useState("");
  const { setBatches, batches, userData } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBatch = {
        name,
      };
      const response = await api.createBatch(newBatch, userData.token);
      //console.log(response);

      if (response.status === 201) {
        setBatches([...batches, response.data]);
        //console.log(response.data);
        setName("");

        toast.success("Successfully added new batch!", {
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
      //   //console.log(response.data);
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <Form>
      <Form.Label>Add new batch</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="new Batch name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default AddBatch;
