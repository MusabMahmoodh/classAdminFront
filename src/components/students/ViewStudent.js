import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as api from "../../API/api";
import { Card } from "react-bootstrap";
import UserContext from "../../context/TeacherContext";
const ViewStudent = () => {
  let { id } = useParams();
  const [student, setStudent] = useState([]);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchStudent(id, userData.token);
        // //console.log(response.data);
        setStudent(response.data);
      } catch (error) {
        //console.log(error);
      }
    };

    fetchData();
  }, {});
  return (
    <Card>
      <Card.Header as="h5">Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ViewStudent;
