import React, {Component} from 'react';
import { timeParse } from 'd3-time-format';
const parseTime = timeParse('%d-%b-%y');

export default class Dot extends Component {
  render() {
    const {data, x, y, showTooltip, hideTooltip} = this.props;
    const points = data.slice(1, -1); // Remove first and last data point

    return (
      <g>{
          // Remove first and last data point
          points.map((d, i) => {
            return (
              <circle
                key={i}
                className="dot"
                r="1.5"
                cx={x(d.date)}
                cy={y(d.close)}
                data-key={parseTime(d.date)}
                data-value={d.count}
                onMouseOver={showTooltip}
                onMouseOut={hideTooltip}
              />
            );
          }
        )
      }</g>
    );
  }
}
