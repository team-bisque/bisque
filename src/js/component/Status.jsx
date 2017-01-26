import React from 'react';

export default function Status (props) {
  const {working, time} = props;

  return (
    <div>
      <h1>Status</h1>
      {/* Bar graphic here */}
      {working
        ? <h2>Your next break in</h2>
        : <h2>Get back to work in</h2>}
      <h3>{time}</h3>
    </div>
  );
}
