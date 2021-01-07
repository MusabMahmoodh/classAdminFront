import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import FileBase from "react-file-base64";
import * as api from "../../API/api";
import UserContext from "../../context/TeacherContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

export const Essay = () => {
  // form data
  const [name, setName] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState({
    name: "",
    type: "",
    base64: "",
  });
  const [batch, setBatch] = useState("0");
  const [subscription, setSubscription] = useState("0");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(Date.now());
  const [ends, setEnds] = useState(Date.now());
  const [duration, setDuration] = useState({
    hour: 0,
    minutes: 0,
  });

  const [type, setType] = useState(false);
  let history = useHistory();
  const {
    subscriptions,
    setSubscriptions,
    setBatches,
    batches,
    userData,
  } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchBatches(userData.token);
        setBatches(response.data);
        console.log(response.data);
        const responseB = await api.fetchSubscriptions(userData.token);
        setSubscriptions(responseB.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error");
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExam = {
        batch,
        subscription,
        end_time: moment.tz(ends, "Asia/Colombo"),
        interval: duration,
        question,
        start_time: moment.tz(start, "Asia/Colombo"),
        answer,
        description,
        name,
        type,
      };

      const response = await api.createExam(newExam, userData.token);
      if (response.status === 201) {
        toast.success("Successfully created !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/exams");
      } else {
        toast.error("Creation failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(response.data.data);
    } catch (error) {
      toast.error("Creation failed!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };
  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Exam Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter student name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Select Batch</Form.Label>
        <Form.Control
          as="select"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="0" disabled>
            Select batch
          </option>
          {batches &&
            batches.map((batch) => (
              <option value={batch._id}>{batch.name}</option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Slect Subscription</Form.Label>
        <Form.Control
          as="select"
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
        >
          <option value="0" disabled>
            Select subscription
          </option>
          {subscriptions &&
            subscriptions.map((batch) => (
              <option value={batch._id}>{batch.name}</option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Slect type(exam/normal question)</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value={false}>Noraml Question</option>
          <option value={true}>Essay</option>
        </Form.Control>
      </Form.Group>

      <Form.Row>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>StartsAt</Form.Label>

          <Datetime onChange={(e) => setStart(e._d)} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>EndsAt</Form.Label>

          <Datetime onChange={(e) => setEnds(e._d)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Label>Duration</Form.Label>
        <br />
        <Form.Group>
          <Form.Control
            size="sm"
            type="number"
            placeholder="Hours"
            max="8"
            min="0"
            value={duration.hour}
            onChange={(e) => setDuration({ ...duration, hour: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            size="sm"
            type="number"
            placeholder="minutes"
            max="59"
            min="0"
            value={duration.minutes}
            onChange={(e) =>
              setDuration({ ...duration, minutes: e.target.value })
            }
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Add questions</Form.Label>
        <br />
        <FileBase
          type="file"
          multiple={false}
          onDone={(base64) => setQuestion(base64)}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Add answers</Form.Label>
        <br />
        <FileBase
          type="file"
          multiple={false}
          onDone={(base64) => setAnswer(base64)}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button
        className="secondary"
        size="lg"
        type="submit"
        onClick={handleSubmit}
        block
      >
        Submit
      </Button>
    </Form>
  );
};
export default Essay;
