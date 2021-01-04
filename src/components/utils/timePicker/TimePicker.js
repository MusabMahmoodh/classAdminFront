import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div>
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
    </div>
  );
};

export default TimePicker;
