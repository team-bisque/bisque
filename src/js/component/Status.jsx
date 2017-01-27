import React from 'react';

export default function Status (props) {
  const status = props.status;

  return (
    <div>
      <h1>Status</h1>
      {/* Bar graphic here */}
      {status && status.isWorking
        ? <h2>Your next break in</h2>
        : <h2>Get back to work in</h2>}
      <h3>{status && status.timeRemaining + ''} minutes</h3>
    </div>
  );
}
