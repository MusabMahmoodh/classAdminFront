import React from "react";
import { Accordion, Card, Button, useAccordionToggle } from "react-bootstrap";
import AddSubscriptionForm from "./AddSubscriptionForm";

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

const AddSubscription = () => {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">Add new subscription</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <AddSubscriptionForm />
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddSubscription;
