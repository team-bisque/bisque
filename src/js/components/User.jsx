'use strict';

import React from 'react';

export default function User (props) {
    const { auth } = props;

    var curHr = new Date().getHours();

    let greeting;
    if (curHr < 12) greeting = 'morning';
    else if (curHr < 16) greeting = 'afternoon';
    else greeting = 'evening';

    const message = (<h3>{`Good ${greeting}, ${auth && auth.displayName.split(' ')[0]}`}</h3>);

    return  (
      <div id="user" className="icon top-center bg-check">
        { auth ? message : null }
      </div>
    );
}
