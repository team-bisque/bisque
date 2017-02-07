'use strict';
import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import LineGraph from './graphs/Line'
// import { setRouteAlias } from '../action-creators/aliases';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);    
  }

  onClickClose(e){
    this.props.setRoute(null)
  }
  render() {  
    console.log('graph',this.props)
    return (
      <div id="graph-modal">
        <div className="modal-bar">
          <div>
            <i className="fa fa-times" onClick={this.onClickClose.bind(this)}></i>
          </div>
        </div>
        <LineGraph db={this.props.db} width={960} height={500} yAxis={'Words Per Minute'}/>
      </div>
    );   
  }
}

