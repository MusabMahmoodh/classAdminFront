import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const Mcqs = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Slect Batch</Form.Label>
        <Form.Control as="select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Slect Subscription</Form.Label>
        <Form.Control as="select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>

      <Form.Row>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>StartsAt</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            showTimeSelect
            maxDate={new Date() + 5}
            isClearable
            showYearDropdown
            scrollableYearDropdown
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>EndsAt</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            showTimeSelect
            maxDate={new Date() + 5}
            isClearable
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
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            size="sm"
            type="number"
            placeholder="minutes"
            max="59"
            min="0"
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Number of questions</Form.Label>
        <Form.Control
          type="number"
          placeholder="enter number of questions"
          max="1"
          min="1"
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button className="secondary" size="lg" block>
        Submit
      </Button>
    </Form>
  );
};

export default Mcqs;
