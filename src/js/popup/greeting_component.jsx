import React, { Component} from "react";

export default class popup extends Component {
  constructor(props){
    super(props)
    this.clickHandler = this.clickHandler.bind(this);
  }

  render () {
    return <p>Hello, find me on src/js/popup/greeting_component.jsx</p>;
  }
};
