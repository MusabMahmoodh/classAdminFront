import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
const ExamDetails = ({
  name,
  batch,
  startTime,
  endTime,
  subscription,
  interval,
  type,
}) => {
  let history = useHistory();
  const { id } = useParams();
  return (
    <>
      <Card>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Text>
            <div>
              <ListGroup variant="flush">
                <ListGroup.Item>Batch : {batch}</ListGroup.Item>
                <ListGroup.Item>
                  Type : {!type ? "essay" : "normal"}
                </ListGroup.Item>
                <ListGroup.Item>Subscription : {subscription}</ListGroup.Item>

                <ListGroup.Item>Starts at:{startTime}</ListGroup.Item>
                <ListGroup.Item>Ends at:{endTime}</ListGroup.Item>
                <ListGroup.Item>
                  Duration :{interval.hour} hours {interval.minutes} minutes
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => history.push(`/exams/${id}/update`)}
          >
            Change!
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ExamDetails;
