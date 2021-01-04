import React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Essay } from "../components/exams/Essay";
import Mcqs from "../components/exams/Mcqs";
const AddExam = () => {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Essay</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">MCQ</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Essay />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Mcqs />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default AddExam;
