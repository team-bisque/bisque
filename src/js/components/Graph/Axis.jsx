import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import {select} from 'd3-selection';

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const node = findDOMNode(this);
    select(node).call(this.props.axis)
      // Removes the axis line, so we just have ticks
      .select('.domain')
        .remove();
  }

  render() {
    const {axisType, height} = this.props;

    return (
      <g
        className="axis"
        transform={
          axisType === 'x'
            ? `translate(0,${height})`
            : ``
          }
        />
    );
  }
}
