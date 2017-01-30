import React from 'react';

import Commands from './Commands'

export default function Status (props) {
  const {status, time} = props;

  const min = time.timeRemaining / 60000;
  return (
    <div id="status">
      {/* Bar graphic here */}
      {status && status.isWorking
        ? <h2>Your next break in</h2>
        : <h2>Get back to work in</h2>}
      <h3>{(min > 1) ? min + ' minutes' : min + ' minute'}</h3>
      <Commands />
    </div>
  );
}
