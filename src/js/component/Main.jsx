import React from 'react';

import {connect} from 'react-redux';

// Components
import Status from './Status';
import Weather from './Weather';
<<<<<<< HEAD
import Settings from './Settings';
=======
>>>>>>> master
import SurveyModal from './SurveyModal';

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

  const {status, time, weather} = props;

  return (
    <div style={style.background} className="row">
      <Weather weather={weather} />
<<<<<<< HEAD
      <Header status={status} />
      <Timer options={options}/>
      <Commands />
      <div>BOTTOM</div>
      <Status status={status} time={time} />
      <SurveyModal status={status} />
      <div>
        <Settings />
      </div>
=======
      <Status status={status} time={time} />
      <SurveyModal status={status} />
      <div>{/* This is where the options component will go */}</div>
>>>>>>> master
    </div>
  );
}

const mapState = (state) => (state);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
