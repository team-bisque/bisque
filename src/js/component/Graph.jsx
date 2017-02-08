'use strict';
import React from 'react';
import LineGraph from './graphs/Line';
import { findDOMNode } from 'react-dom';

const data = require('../controllers/dummyData.json')

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500
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
    // const elem = document.getElementById('graph-modal');
    console.log('updateDimensions', elem.offsetWidth, elem.offsetHeight)
    this.setState({
      width: elem.offsetWidth - 50,
      height: elem.offsetHeight -25
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
        <LineGraph data={this.props.history} width={width} height={height} label={'Words Per Minute'}/>
      </div>
    );
  }
}
