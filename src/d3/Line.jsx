import React, {Component} from 'react';

export default class Line extends Component {
  getDefaultProps() {
    return {
      path: '',
      color: 'blue',
      width: 2
    }
  }

  render() {
    return (
      <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
    );
  }
}
