import React from 'react';

import moment from 'moment';

export default function Status (props) {
  const {work, timeNow} = props;

  return (
    <div>
      <h1>Status</h1>
      {/* Bar graphic here */}
      {work
        ? <h2>Your next break in</h2>
        : <h2>Get back to work in</h2>}
      <h3>{moment(timeNow).format('h:mm:ss a')}</h3>
    </div>
  );
}
