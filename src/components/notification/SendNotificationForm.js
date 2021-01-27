import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as apiNotification from "../../API/notificationApi";
import * as api from "../../API/api";
import UserContext from "../../context/TeacherContext";
const SendNotificationForm = () => {
  let history = useHistory();
  const [message, setMessage] = useState({
    title: "",
    body: "",
    from: "admin",
    students: [],
  });
  const { students, setStudents, userData } = useContext(UserContext);
  //   console.log(students);
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await api.fetchStudents(userData.token);
        setStudents(response.data);
      } catch (error) {
        //console.log(error)
      }
    };

    postData();
  }, []);
  const handleSubmit = async () => {
    try {
      const response = await apiNotification.sendNotification(
        message,
        userData.token
      );
      // setStudents(response.data);
      alert("messages sent successfully");
      history.push("/");
    } catch (error) {
      //console.log(error)
      alert("message sending failed");
    }
    console.log(message);
  };
  return (
    <div style={{ marginBottom: "10px" }}>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            value={message.title}
            onChange={(e) => setMessage({ ...message, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="body"
            value={message.body}
            onChange={(e) => setMessage({ ...message, body: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="text"
            placeholder="from"
            value={message.from}
            onChange={(e) => setMessage({ ...message, from: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Select recipients</Form.Label>
          <Form.Control
            as="select"
            multiple
            onChange={(e) => {
              const selected = [];
              for (const item of e.target.selectedOptions) {
                selected.push(item.value);
              }
              setMessage({ ...message, students: selected });
            }}
          >
            {students &&
              students.map((st) => (
                <option value={st._id}>
                  {st.name}
                  {" : "}
                  {st.indexNo}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <Button onClick={() => handleSubmit()}>Send</Button>
    </div>
  );
};

export default SendNotificationForm;
