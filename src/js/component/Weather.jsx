'use strict';

import React from 'react';

export default function Steps (props) {
  const {name, weather} = props
  return (
    <div>
      <span>Weather in {name}</span>
      <div>{weather && weather.description}</div>
    </div>
  );
}
