import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Batch = ({ batch }) => {
  let history = useHistory();
  return (
    <Card style={{ margin: "auto", marginBottom: "10px" }}>
      <Card.Img
        variant="top"
        src="https://source.unsplash.com/random/400x100"
      />
      <Card.Body>
        <Card.Title>{batch.name}</Card.Title>
        <Button
          variant="primary"
          onClick={() => history.push(`/batches/${batch._id}`)}
        >
          Go to batch {batch.name}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Batch;
