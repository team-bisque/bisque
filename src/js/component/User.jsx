'use strict';

import React from 'react';
import Login from './Login';

export default function User (props) {
  const {user} = props;

  return (
    <div id="user">
      {user
        ? "You're logged in!"
        : <Login />}
    </div>
  );
}
