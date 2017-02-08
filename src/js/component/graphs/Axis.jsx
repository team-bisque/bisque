import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import {select} from 'd3-selection';

export default class Axis extends Component {
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const node = findDOMNode(this);
    select(node).call(this.props.axis);
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
