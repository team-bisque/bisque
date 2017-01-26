import React from 'react';

export default function Status (props) {
  const {work, timeRemaining} = props.status;

  return (
    <div>
      <h1>Status</h1>
      {/* Bar graphic here */}
      {work
        ? <h2>Your next break in</h2>
        : <h2>Get back to work in</h2>}
      <h3>{timeRemaining + ''} minutes</h3>
    </div>
  );
}
