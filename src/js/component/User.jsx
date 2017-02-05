'use strict';

import React from 'react';
import Login from './Login';

export default function User (props) {
  const {user, db} = props;

  return (
    <div id="user">
      {user
        ? <h3>{user.displayName}</h3>
        : <span><Login /></span>}
    </div>
  );
}
