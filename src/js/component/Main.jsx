import React from 'react';

import {connect} from 'react-redux';

// Components
import Commands from './Commands';
import Header from './Header';
import Status from './Status';
import Timer from './Timer';
import Weather from './Weather';
import Settings from './Settings';

const style = {
  background: {
    width: 100 + '%',
    height: 100 + 'vh',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  }
};

export function Main (props) {

  const {status, time, weather} = props;
  let workDuration;
  if (time) workDuration = time.workDuration;

  const options = {
    prefix: 'seconds elapsed!',
    delay: workDuration
  };

  return (
    <div style={style.background} className="row">
      <div>TOP</div>

      <Weather weather={weather} />
      <Header status={status} />
      <Status status={status} />
      <Timer options={options}/>
      <Commands />
      <Settings />
      <div>BOTTOM</div>
    </div>
  );
}

const mapState = (state) => (state);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
