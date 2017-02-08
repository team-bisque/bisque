'use strict';
import React from 'react';
import LineGraph from './graphs/Line';
import { findDOMNode } from 'react-dom';
// import { setRouteAlias } from '../action-creators/aliases';


export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500
    };
  }

  componentDidMount() {
    this.setSize();
  }

  componentWillUpdate(props, state) {
    console.log('NEW WIDTH:', state.width, 'OLD WIDTH:', this.state.width);
    if (state.width !== this.state.width) this.setSize();
  }

  setSize() {
    const elem = findDOMNode(this);
    this.setState({
      width: elem.offsetWidth,
      height: elem.offsetHeight
    });
  }

  onClickClose(e){
    this.props.setRoute(null)
  }

  render() {
    const {width, height} = this.state;
    return (
      <div id="graph-modal">
        <div className="modal-bar">
          <div>
            <i className="fa fa-times" onClick={this.onClickClose.bind(this)}></i>
          </div>
        </div>
        <LineGraph db={this.props.db} width={width} height={height} label={'Words Per Minute'}/>
      </div>
    );
  }
}
