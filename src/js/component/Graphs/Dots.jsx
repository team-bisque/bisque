import React, {Component} from 'react';

export default class Dot extends Component {
  render() {
    const {data, x, y} = this.props;

    return (
      <g>{
          // Remove first and last data point
          data.slice(1, -1).map((d, i) => {
            return (
              <circle
                key={i}
                className="dot"
                r=".5"
                cx={x(d.date)}
                cy={y(d.close)}
                strokeWidth="1px"
                stroke="steelblue"
              />
          );
          }
        )
      }</g>
    );
  }
}
