import React from "react";
import { Row, Col } from "react-bootstrap";
import Batch from "./Batch";

const DashPage = ({ batches }) => {
  return (
    <Row>
      {batches &&
        batches.map((batch) => (
          <Col xs={12} md={4}>
            <Batch batch={batch} />
          </Col>
        ))}
    </Row>
  );
};

export default DashPage;
