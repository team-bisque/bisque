import React, {Component } from 'react'
import {findDOMNode} from 'react-dom';
import {select} from 'd3-selection';

export default class Grid extends Component{
  componentDidMount() {
    this.renderGrid();
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  renderGrid() {
    const node = findDOMNode(this);
    select(node).call(this.props.grid);
  }

  render() {
    const {gridType, height} = this.props;

    return (
      <g className="y-grid"
        transform={
          gridType === 'x'
            ? `translate(0,${height})`
            : ''
          }/>
    );
  }
}
