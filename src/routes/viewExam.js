import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

import * as api from "../API/api";
import ExamDetails from "../components/exams/ExamDetails.js";
import QuestionPanel from "../components/questions/QuestionPanel.js";
import UserContext from "../context/TeacherContext";
const ViewExam = () => {
  let history = useHistory();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subscription, setSubscription] = useState("");
  const [interval, setInterval] = useState({ hour: "", minutes: "" });
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { userData } = useContext(UserContext);
  //console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.fetchExam(id, userData.token);
        //console.log(res.data);
        setName(res.data.name);
        setBatch(res.data.batch.name);
        setStartTime(res.data.start_time);
        setEndTime(res.data.end_time);
        setSubscription(res.data.subscription.name);
        setInterval({
          hour: res.data.interval[0].hour,
          minutes: res.data.interval[0].minutes,
        });
        setQuestion(res.data.question.imageBase64);
        setAnswer(res.data.answer.imageBase64);
      } catch (error) {
        //console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Details">
        <ExamDetails
          name={name}
          batch={batch}
          startTime={startTime}
          endTime={endTime}
          subscription={subscription}
          interval={interval}
        />
        {/* {//console.log(question)} */}
      </Tab>
      <Tab eventKey="profile" title="Question">
        <QuestionPanel question={question} answer={answer} />
      </Tab>
      <Tab eventKey="contact" title="Submissions" disabled></Tab>
    </Tabs>
  );
};

export default ViewExam;
