import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import UserContext from "../../context/TeacherContext";
import * as api from "../../API/api.js";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { userData, setUserData, login } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { name, password };
      const loginRes = await api.login(loginUser);
      // //console.log(loginRes);
      setUserData({
        ...userData,
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      login();
    } catch (err) {
      // //console.log(err);
    }
  };
  return (
    <div className="container">
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">hmmm</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
