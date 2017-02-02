import React from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

const DurationInputGroup = (props) => {
  const {
    hoursHandleChange,
    minutesHandleChange,
    category,
    hours,
    minutes,
  } = props;
  return (
    <div>
      <FormGroup controlId="formInlineName">
        <ControlLabel>{category} Hours</ControlLabel>
        <FormControl type="number" value={hours || 0} onChange={hoursHandleChange} />
      </FormGroup>
      <FormGroup controlId="formInlineName">
        <ControlLabel>{category} Minutes</ControlLabel>
        <FormControl type="number" value={minutes || 0} onChange={minutesHandleChange} />
      </FormGroup>
    </div>
  )
}

export default DurationInputGroup;
