import React from 'react';

import {connect} from 'react-redux';

// Components
import Status from './Status';
import User from './User';
import BostockLine from '../../d3/BostockLine'
import Weather from './Weather';
import SurveyModal from './SurveyModal';
import SettingsModal from './SettingsModal';

const bg = Math.floor(Math.random() * (8 - 1)) + 1;

const style = {
  background: {
    width: 100 + '%',
    height: 100 + 'vh',
    background: `url("images/wallpapers/${3}.jpg") no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  }
};

export function Main (props) {

  const {status, settings, weather, db, auth} = props;

  return (
    <div style={style.background} className="row">
      <BostockLine data={db} width={960} height={500} />
    </div>
  );
}

const mapState = (state) => (state);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
