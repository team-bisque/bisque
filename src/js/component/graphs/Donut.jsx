import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as d3 from 'd3';
import { select, getAttribute, selectAll } from 'd3-selection';
import { arc, pie } from 'd3-shape';

export class Donut extends Component {

  componentDidMount() {
    const minutes =  [
      {label: 'remaining', count: 10},
      {label: 'spent', count: 50}
    ]
    const width = 360;
    const height = 360;
    const donutWidth = 75;
    const radius = Math.min(360, 360) / 2;

    const red = '#a92a2a';
    const pink = '#ffb794';
    const transparent = 'rgba(255, 183, 148, 0.3)'

    const color = d3.scaleOrdinal()
      .range([pink, transparent])

    const g = d3.select('svg')
      .append('g')
      .attr('transform', `translate(180,180)`)

    const svg = d3.select('svg')
      .append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)

    const arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null) // No auto-sorting

    const path = svg.selectAll('path')
      .data(pie(minutes))
      .enter()
      .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(d.data.label))
  }

  render() {
    return <svg width="360" height="360" />
  }
}

const mapState = ({status}) => ({minutes: status.timeRemaining});

export default connect(mapState, null)(Donut);
