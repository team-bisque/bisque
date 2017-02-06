import React from 'react';

import {connect} from 'react-redux';

// Components
import Status from './Status';
import User from './User';
import Weather from './Weather';
import SettingsModal from './SettingsModal';
import LineGraph from './graphs/Line'

const bg = Math.floor(Math.random() * (8 - 1)) + 1;

const style = {
  background: {
    width: 100 + '%',
    height: 100 + 'vh',
    background: `url("images/wallpapers/${bg}.jpg") no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  }
};

export function Main (props) {

  const {status, settings, weather, auth, db} = props;

  return (
    <div style={style.background} className="row">
      <div className="row">
        <User user={auth} />
        <Weather weather={weather} />
      </div>
      <Status status={status} />
      <SettingsModal settings={settings}/>
      <LineGraph db={db} width={960} height={500} yAxis={'Words Per Minute'}/>
    </div>
  );
}

const mapState = (state) => (state);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
