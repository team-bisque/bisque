'use strict';

//CSS
require('../../css/settings-modal.css');

//Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Grid,
  Row,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

//Local
import {setDuration} from '../action-creators/settings';
import {convertMillisecondsToMinutes} from '../utils';
import store from '../store';


class SettingsDurationTab extends Component {
  constructor(props) {
    super(props);
    this.minuteOnChange = this.minuteOnChange.bind(this);
  }

  minuteOnChange(event) {
    const {name} = event.target;
    const milliseconds = event.target.value * 60000;
    store.dispatch(setDuration(name, milliseconds));
  }

  render() {
    const {
      workDuration,
      breakDuration,
      lunchDuration
    } = this.props;
    const {minuteOnChange} = this;

    return (
      <Grid fluid={true}>
        <Row>
          <center>
            <Row>
              <label className="settings-text">Work Minutes</label>
              <input
                type="number"
                name="workMinutes"
                value={convertMillisecondsToMinutes(workDuration) || 0}
                onChange={minuteOnChange}
              />
            </Row>
            <Row>
              <label className="settings-text">Break Minutes</label>
              <input
                type="number"
                name="breakMinutes"
                value={convertMillisecondsToMinutes(breakDuration) || 0}
                onChange={minuteOnChange} />
            </Row>
            <Row>
              <label className="settings-text">Lunch Minutes</label>
              <input
              type="number"
              name="lunchMinutes"
              value={convertMillisecondsToMinutes(lunchDuration) || 0}
              onChange={minuteOnChange} />
            </Row>
          </center>
        </Row>
      </Grid>
    );
  }
}

const mapState = ({settings}) => ({settings});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsDurationTab);
