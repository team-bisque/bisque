import React from 'react';

import {connect} from 'react-redux';

// Components
import Commands from './Commands';
import Header from './Header';
import Status from './Status';
import Timer from './Timer';
import Weather from './Weather';
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

export class Main extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {status, time, weather} = this.props;

    let workDuration;
    if (time) workDuration = time.workDuration;

    const options = {
      prefix: 'seconds elapsed!',
      delay: workDuration
    };

    return (
      <div className="row">
        <div style={style.background}>TOP
          <Weather weather={weather} />
          <Header status={status} />
          <Status status={status} />
          <Timer options={options} />
          <Commands />
        </div>
        <div>
          <SurveyModal status={status} />
        </div>
      </div>
    )
  }
}

const mapState = (state) => (state);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
