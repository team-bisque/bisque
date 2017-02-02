import React from 'react';

const TimeInputForm = (props) => {
  const {
    hoursHandleChange,
    minutesHandleChange,
    category,
    hours,
    minutes,
  } = props;
  return (
    <div>
      <h3>{category} Duration</h3>
        <label>Hours</label>
        <input
          type="number"
          value={hours}
          className="form-control"
          id="hours"
          onChange={hoursHandleChange}
        />
        <label>Minutes</label>
          <input
            type="number"
            value={minutes}
            className="form-control"
            id="minutes"
            onChange={minutesHandleChange}
          />
    </div>
  )
}

export default TimeInputForm;
