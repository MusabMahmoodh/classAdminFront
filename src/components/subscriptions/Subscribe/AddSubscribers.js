import React from "react";
import { ListGroup, Button } from "react-bootstrap";
const AddSubscribers = ({ nonSubscribers, addSubscriber }) => {
  return (
    <ListGroup>
      {nonSubscribers &&
        nonSubscribers.map((sub) => (
          <ListGroup.Item key={sub._id}>
            {sub.indexNo}
            {"  : "} {sub.name}
            <Button
              variant="success"
              style={{ float: "right" }}
              size="sm"
              onClick={() => addSubscriber(sub)}
            >
              Add
            </Button>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default AddSubscribers;
