import React, {Component} from 'react';
import Line from './Line';
import d3 from 'd3';

export default class DataSeries extends Component {
  getDefaultProps() {
    return {
      title: '',
      data: [],
      interpolate: 'linear'
    };
  }

  render() {
    var self = this,
        props = this.props,
        yScale = props.yScale,
        xScale = props.xScale;

    var path = d3.svg.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.y); })
        .interpolate(this.props.interpolate);

    return (
      <Line path={path(this.props.data)} color={this.props.color} />
    )
  }
}
