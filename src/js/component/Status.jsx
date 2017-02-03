import React from 'react';

import Timer from './Timer'
import Commands from './Commands'

export default function Status (props) {
  const {status} = props;

  const min = status.timeRemaining / 60000;
  return (
    <div id="status">
      {/* Bar graphic here */}
      {
        status && status.isPaused
          ? <h2>You’re paused!</h2>
          : <Timer status={status} />
      }
      <Commands status={status}/>
    </div>
  );
}
