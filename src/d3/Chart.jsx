import React, {Component} from 'react';

export default class Chart extends Component {
  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
}
