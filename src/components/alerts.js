import React from "react";
import { Alert } from "react-bootstrap";

export default function alerts({ variant, message, link, path }) {
  return (
    <div>
      <Alert variant={variant}>{message} </Alert>
    </div>
  );
}
