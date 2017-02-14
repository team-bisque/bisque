import React, {Component} from 'react';
import moment from 'moment';

export default function Dot (props){
  const {data, x, y, showTooltip, hideTooltip} = props;
  const points = data.slice(1, -1); // Remove first and last data point

  return (
    <g>{
        points.map((d, i) => {
          return (
            <circle
              key={i}
              className="dot"
              r="1.5"
              cx={x(d.date)}
              cy={y(d.avgWPM)}
              data-key={moment(d.date).format('MMMM Do YYYY')}
              data-value={Math.floor(d.avgWPM)}
              onMouseOver={showTooltip}
              onMouseOut={hideTooltip}
            />
          );
        }
      )
    }</g>
  );
}
