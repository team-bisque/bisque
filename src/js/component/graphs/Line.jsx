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
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.setData();
  }

  setData () {
    const {data} = this.props;

    const graphData = this.mapData(data);

    console.log(graphData);
    
    this.setState({data: graphData[0]})
  }

  mapData (data) {
    return _.map(Object.keys(data), (day)=>{
      let datemilsec = new Date(day.replace('-', ' ')).getTime();
      console.log(datemilsec)
      return _.map(Object.keys(data[day]), (hour) => {
        let hourmilsec = hour * 1000 * 3600;
        return {
          date: new Date(datemilsec+hourmilsec), 
          avgCPM: _.meanBy(data[day][hour], 'cpm'), 
          totalCPM: _.sumBy(data[day][hour], 'cpm')
        }
      })
    });
  }
  render() {
    const {height, width, margin} = this.props;
    const {data} = this.state;

      console.log(data)    ;

    let widthDiff = margin.left + margin.right;
    let heightDiff = margin.top + margin.bottom;

    // D3 goodness
    let x = scaleTime()
            .domain(extent(data, d => d.date))
            .rangeRound([0, (width - widthDiff)])
    let y = scaleLinear()
            .domain(extent(data, d => d.totalCPM))
            .range([(height - heightDiff), 0])
    let lineEquation = line().x(d => x(d.date)).y(d => y(+d.totalCPM))
    let xAxis = axisBottom(x);
    let yAxis = axisLeft(y);

    console.log('Line Data', data, x, y, lineEquation, xAxis, yAxis)
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
  data,
  width,
  height,
  label,
});

export default connect(mapState, null)(Line);
