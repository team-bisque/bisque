import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dots from './Dots';
import Axis from './Axis';
// import Grid from './Grid';

import { line } from 'd3-shape';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent } from 'd3-array';

// New d3 time parser
import { timeParse } from 'd3-time-format';
const parseTime = timeParse('%d-%b-%y');

import json from '../../controllers/dummyData.json';

export class Line extends Component {
  render() {
    const {data, height, width, margin} = this.props;

    let widthDiff = margin.left + margin.right;
    let heightDiff = margin.top + margin.bottom;

    // D3 goodness
    let x = scaleTime()
            .domain(extent(data, d => d.date))
            .rangeRound([0, (width - widthDiff)])
    let y = scaleLinear()
            .domain(extent(data, d => d.close))
            .range([(height - heightDiff), 0])
    let lineEquation = line().x(d => x(d.date)).y(d => y(d.close))
    let xAxis = axisBottom(x);
    let yAxis = axisLeft(y);


    return (
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* <Grid height={height - heightDiff} grid={yGrid} gridType="y" /> */}
            <path className="line" d={lineEquation(data)} />
            <Dots data={data} x={x} y={y} />
            <Axis height={height - heightDiff} axis={yAxis} axisType="y" />
            <Axis height={height - heightDiff} axis={xAxis} axisType="x" />
          </g>
        </svg>
    );
  }
}

// Setting conventional margins
// https://bl.ocks.org/mbostock/3019563
const margin = {top: 20, right: 20, bottom: 30, left: 50};

const mapState = (state, {data, width, height, label}) => ({
  margin,
  data: json.map(d => { return {close: +d.close, date: parseTime(d.date)}}),
  width,
  height,
  label,
});

export default connect(mapState, null)(Line);
