'use strict';
import React from 'react';
import LineGraph from './graphs/Line';
import { findDOMNode } from 'react-dom';
// import { setRouteAlias } from '../action-creators/aliases';

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
    // const elem = findDOMNode(this);
    window.addEventListener("resize", this.updateDimensions);    
  }

  componentWillUnmount() {
    // const elem = findDOMNode(this);
    window.removeEventListener("resize", this.updateDimensions);
  }

  // componentWillUpdate(props, state) {
  //   console.log('NEW WIDTH:', state.width, 'OLD WIDTH:', this.state.width);
  //   if (state.width !== this.state.width) this.updateDimensions();
  // }

  updateDimensions() {
    const elem = document.getElementById('graph-modal');
    console.log('updateDimensions', elem.offsetWidth, elem.offsetHeight)
    this.setState({
      width: elem.offsetWidth - 50,
      height: elem.offsetHeight -25
    });
  }

  onClickClose(e){
    this.props.setRoute(null)
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
        <LineGraph data={data} width={width} height={height} label={'Words Per Minute'}/>
      </div>
    );
  }
}
