import React from 'react';

import Commands from './Commands'

export default function Timer (props) {
  const {status} = props;

  const min = status.timeRemaining / 60000;
  return (
    <div id="timer">
      {status && status.isWorking
        ? <h2>Your next break in</h2>
        : <h2>Get back to work in</h2>}
      <h3>{(min > 1) ? min + ' minutes' : min + ' minute'}</h3>
    </div>
  );
}
