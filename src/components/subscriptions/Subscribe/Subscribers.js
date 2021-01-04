import React from "react";
import { ListGroup, Button } from "react-bootstrap";
const Subscribers = ({ subscribers, removeSubscriber }) => {
  return (
    <ListGroup>
      {subscribers &&
        subscribers.map((sub) => (
          <ListGroup.Item key={sub._id}>
            {sub.indexNo}
            {"  : "} {sub.name}
            <Button
              variant="danger"
              style={{ float: "right" }}
              size="sm"
              onClick={() => removeSubscriber(sub)}
            >
              Remove
            </Button>{" "}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default Subscribers;
