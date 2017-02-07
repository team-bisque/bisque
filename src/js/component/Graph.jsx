'use strict';
import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import LineGraph from './graphs/Line'
// import { setRouteAlias } from '../action-creators/aliases';

const data = require('../controllers/dummyData.json')

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500
    }
  }  
  componentDidMount() {
    const element = document.getElementById('graph-modal');
    console.log(element.offsetWidth);
    this.setSize({
      width: element.offsetWidth,
      height: element.offsetHeight
    })
  }

  setSize(size){
    this.setState(size);
  }

  onClickClose(e){
    this.props.setRoute(null)
  }
  render() {    
    return (
      <div id="graph-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Graph</div>
          <div>
            <i className="fa fa-times" onClick={this.onClickClose.bind(this)}></i>
          </div>
        </div>
        <LineGraph data={data} width={this.state.width} height={this.state.height} label={'Words Per Minute'}/>
      </div>
    );
  }
}

