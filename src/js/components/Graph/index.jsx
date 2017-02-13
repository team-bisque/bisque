'use strict';

import React from 'react';
import Chart from './Chart';
import { findDOMNode } from 'react-dom';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
      height: 400
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions(); // Initial resize
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const elem = findDOMNode(this);
    this.setState({
      width: elem.offsetWidth,
      height: elem.offsetHeight
    });
  }

  onClickClose(e){
    this.props.setRoute(null);
  }

  render() {
    const {width, height} = this.state;
    return (
      <div id="graph-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Graph</div>
          <div>
            <i className="fa fa-times" onClick={this.onClickClose.bind(this)}></i>
          </div>
        </div>
        <Chart data={this.props.history} width={width} height={height} label={'Words Per Minute'}/>
      </div>
    );
  }
}
