import React from 'react';

import {connect} from 'react-redux';

// Components
import Commands from './Commands';
import Header from './Header';
import Status from './Status';
import Timer from './Timer';
import Weather from './Weather';

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

  const options = {
    prefix: 'seconds elapsed!',
    delay: props.workDuration
  };

  return (
    <div style={style.background} className="row">
      <div>TOP</div>

      <Header status={status} />
      <Status status={status} />
      <Timer options={options}/>
      <Commands />
      <Weather weather={weather} />

      <div>BOTTOM</div>
    </div>
  );
}

const mapState = (state) => (state);

export default connect(mapState, mapDispatch)(Main);
