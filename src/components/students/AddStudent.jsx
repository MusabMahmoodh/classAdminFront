import React from "react";
import { Accordion, Card, Button, useAccordionToggle } from "react-bootstrap";
import AddStudentForm from "./AddStudentForm";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "pink", border: "none", padding: ".5em" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const AddStudent = () => {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">Add new student</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <AddStudentForm />
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddStudent;
