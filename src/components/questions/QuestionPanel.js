import React, { useEffect, useState } from "react";
import { Image, Jumbotron } from "react-bootstrap";

const QuestionPanel = ({ question }) => {
  // console.log(exam);
  return (
    <div>
      <Jumbotron fluid>
        <Image src={`${question}`} alt="Red dot" fluid />
      </Jumbotron>
    </div>
  );
};

export default QuestionPanel;
