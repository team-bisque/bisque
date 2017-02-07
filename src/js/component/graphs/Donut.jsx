import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as d3 from 'd3';
import { select, getAttribute, selectAll } from 'd3-selection';
import { arc, pie } from 'd3-shape';

export class Donut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0
    }
  }
  componentDidMount() {
    this.setMinute(this.props.minutes)

    const minutes =  [
      {label: 'remaining', count: this.state.minutes},
      {label: 'spent', count: 60 - this.state.minutes}
    ]
    const {diameter, center} = this.props
    const radius = diameter / 2;

    let colors = ['#fff', 'rgba(255, 255, 255, 0.3)'];
    // Less than 5 minutes triggers pink color
    if (minutes[0].count < 6) colors = ['#ffb794', 'rgba(255, 183, 148, 0.3)'];
    if (minutes[0].count < 1) colors = ['#a92a2a', 'rgba(169, 42, 42, 0.3)']

    const color = d3.scaleOrdinal()
      .range(colors)

    const g = d3.select('svg')
      .append('g')
      .attr('transform', `translate(${radius},${radius})`)

    const svg = d3.select('svg')
      .append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
      .append('g')
        .attr('transform', `translate(${radius},${radius})`)

    const arc = d3.arc()
      .innerRadius(radius - center)
      .outerRadius(radius);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null); // No auto-sorting

    const path = svg.selectAll('path')
      .data(pie(minutes))
      .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(d.data.label))    
  }

  setMinute(min){
    this.setState({minutes: min});
  }

  componentWillReceiveProps(nextProps) {
    console.log('Donut componentWillReceiveProps', nextProps)
    const minutes =  [
      {label: 'remaining', count: this.state.minutes},
      {label: 'spent', count: 60 - this.state.minutes}
    ]
    const {diameter, center} = this.props
    const radius = diameter / 2;

    let colors = ['#fff', 'rgba(255, 255, 255, 0.3)'];
    // Less than 5 minutes triggers pink color
    if (minutes[0].count < 6) colors = ['#ffb794', 'rgba(255, 183, 148, 0.3)'];
    if (minutes[0].count < 1) colors = ['#a92a2a', 'rgba(169, 42, 42, 0.3)']

    const color = d3.scaleOrdinal()
      .range(colors)

    const g = d3.select('svg')      
      .attr('transform', `translate(${radius},${radius})`)

    const svg = d3.select('g')      
        .attr('transform', `translate(${radius},${radius})`)

    const arc = d3.arc()
      .innerRadius(radius - center)
      .outerRadius(radius);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null); // No auto-sorting

    const path = svg.selectAll('path')
      .data(pie(minutes))
      .enter()        
        .selectAll('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(d.data.label))  
    if(nextProps.minutes !== this.state.minutes) this.setState({minutes: nextProps.minutes});
    
  }

  render() {
    

    return <svg className="donut-timer" width={this.props.diameter} height={this.props.diameter} />
  }
}

const mapState = ({status}, {diameter, center}) => ({
  minutes: status.timeRemaining / 60000,
  diameter,
  center
});

export default connect(mapState, null)(Donut);
