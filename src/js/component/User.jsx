'use strict';

import React from 'react';

import WhoAmI from './WhoAmI';
import Login from './Login';

export default function User (props) {
  const {user} = props;

  return (
    <div id="user">
      {user
        ? <h3>{user.displayName}</h3>
        : <span><Login /></span>}
    </div>
  );
}
