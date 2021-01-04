import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Image, Jumbotron } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileBase from "react-file-base64";
import * as api from "../API/api.js";
import UserContext from "../context/TeacherContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";

export const UpdateExam = () => {
  let history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [question, setQuestion] = useState({
    name: "",
    type: "",
    base64: "",
  });
  const [answer, setAnswer] = useState({
    name: "",
    type: "",
    base64: "",
  });
  const [batch, setBatch] = useState("0");
  const [batchId, setBatchId] = useState("0");
  const [type, setType] = useState(false);
  const [subscription, setSubscription] = useState("0");
  const [subId, setSubId] = useState("0");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState({
    hour: 0,
    minutes: 0,
  });
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

        const responseB = await api.fetchSubscriptions(userData.token);
        setSubscriptions(responseB.data);

        const res = await api.fetchExam(id, userData.token);
        console.log(res.data.interval);
        setName(res.data.name);
        setBatch(res.data.batch.name);
        setBatchId(res.data.batch._id);
        setStartTime(Date.parse(res.data.start_time));
        setEndTime(Date.parse(res.data.end_time));
        setSubscription(res.data.subscription.name);
        setDescription(res.data.description);
        setSubId(res.data.subscription._id);
        setDuration({
          ...duration,
          hour: res.data.interval[0].hour,
          minutes: res.data.interval[0].minutes,
        });
        setType(res.data.type);
        setQuestion({
          ...question,
          name: res.data.question.filename,
          type: res.data.question.contentType,
          base64: res.data.question.imageBase64,
        });
        setAnswer({
          ...answer,
          name: res.data.answer.filename,
          type: res.data.answer.contentType,
          base64: res.data.answer.imageBase64,
        });
        console.log(question);
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
        name,
        batch: batchId,
        subscription: subId,
        end_time: endTime,
        start_time: startTime,
        interval: duration,
        question,
        answer,
        description,
        type,
      };
      const response = await api.updateExam(id, newExam, userData.token);
      if (response.status === 204) {
        toast.success("Successfully updated !", {
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
        toast.error("Updation failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // console.log(response.data.data);
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
          <option value={batchId}>{batch}</option>
          {batches &&
            batches.map((batch) => {
              if (batch._id !== batchId) {
                return <option value={batch._id}>{batch.name}</option>;
              } else {
                return null;
              }
            })}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Slect Subscription</Form.Label>
        <Form.Control
          as="select"
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
        >
          <option value={subId}>{subscription}</option>
          {subscriptions &&
            subscriptions.map((sub) => {
              if (sub._id !== subId) {
                return <option value={sub._id}>{sub.name}</option>;
              } else {
                return null;
              }
            })}
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
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            minDate={new Date()}
            showTimeSelect
            closeWidgets
            DateTimePicker
            dateFormat="dd-MM-yyyy HH:mm:ss"
            maxDate={new Date() + 5}
            isClearable
            meIntervals={15}
            showYearDropdown
            scrollableYearDropdown
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>EndsAt</Form.Label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            minDate={new Date()}
            showTimeSelect
            closeWidgets
            DateTimePicker
            dateFormat="dd-MM-yyyy HH:mm:ss"
            isClearable
            meIntervals={15}
            showYearDropdown
            scrollableYearDropdown
          />
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
        <Form.Label>Change question</Form.Label>
        <Jumbotron fluid>
          <Image src={`${question.base64}`} alt="question" fluid />
        </Jumbotron>
        <br />
        <FileBase
          type="file"
          multiple={false}
          onDone={(base64) => setQuestion(base64)}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Add answers</Form.Label>

        {answer.base64 !== "" ? (
          <Jumbotron fluid>
            <Image src={`${answer.base64}`} alt="Answer not available " fluid />
          </Jumbotron>
        ) : null}

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
export default UpdateExam;
