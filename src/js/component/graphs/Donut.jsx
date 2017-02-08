import React, {Component} from 'react';
import {connect} from 'react-redux';

import Slice from './Slice';

import { pie } from 'd3-shape';

export class Donut extends Component {
  renderSlice(value, i) {
    const {data, radius, center} = this.props;
    let colorOptions = ['#fff', 'rgba(255, 255, 255, 0.3)'];
    // Less than 5 minutes triggers pink color
    console.log(data.count);
    if (data[0] < 6) {
      colorOptions = ['#ffb794', 'rgba(255, 183, 148, 0.3)'];
    }
    if (data[0] < 1) {
      colorOptions = ['#a92a2a', 'rgba(169, 42, 42, 0.3)'];
    }

    return (
      <Slice key={i}
            outerRadius={radius}
            innerRadius={radius - center}
            value={value}
            fill={colorOptions[i]}
            />
    )
  }

  render() {
    const {diameter, radius, data } = this.props;

    const pieEquation = pie().sort(null);

    return (
      <svg className="donut-timer" width={diameter} height={diameter} >
        <g transform={`translate(${radius},${radius})`}>
          {pieEquation(data).map(this.renderSlice.bind(this))}
        </g>
      </svg>
    )
  }
}

const mapState = ({status}, {diameter, center}) => ({
  data: [status.timeRemaining / 60000, (60 - status.timeRemaining / 60000)],
  diameter,
  radius: diameter / 2,
  center
});

export default connect(mapState, null)(Donut);
