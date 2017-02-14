import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Dots from './Dots';
import Axis from './Axis';
import Tooltip from './Tooltip';
import Grid from './Grid'; // Not working yet

import { line } from 'd3-shape';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent } from 'd3-array';

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tooltip: { data: {}, pos: {}}
    }
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  componentDidMount() {
    this.setData();
  }

  setData () {
    const graphData = this.mapData(this.props.data);

    this.setState({data: _.flatten(graphData)})
  }

  mapData (data) {
    const filteredData = {};
    for (let day in data) {
      filteredData[day] = _.map(data[day], hour => _.filter(hour, tab => tab.wpm && tab.wpm > 0)).filter(day1 => day1.length > 0);
    }

    return _.map(Object.keys(filteredData), (day) => {
      let datemilsec = new Date(day.replace('-', ' ')).getTime();
      return _.map(Object.keys(filteredData[day]), (hour) => {
        let hourmilsec = hour * 1000 * 3600;
        return {
          date: new Date(datemilsec+hourmilsec),
          avgWPM: _.meanBy(filteredData[day][hour], 'wpm') || 0
        }
      })
    });
  }

  showTooltip(e) {
    e.target.setAttribute('fill', '#fff');

    this.setState({
      tooltip: {
        display: true,
        data: {
          key: e.target.getAttribute('data-key'),
          value: e.target.getAttribute('data-value')
        },
        pos: {
          x: e.target.getAttribute('cx'),
          y: e.target.getAttribute('cy')
        }
      }
   });
  }

  hideTooltip(e) {
    e.target.setAttribute('fill', '#fff');
    this.setState({
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      }
    });
  }

  render() {
    const {height, width, margin} = this.props;
    const {data} = this.state;

    let widthDiff = margin.left + margin.right;
    let heightDiff = margin.top + margin.bottom;

    // D3 goodness
    let xCoords = scaleTime()
            .domain(extent(data, d => d.date))
            .rangeRound([0, (width - widthDiff)]);
    let yCoords = scaleLinear()
            .domain(extent(data, d => d.avgWPM))
            .range([(height - heightDiff), 0]);
    let lineEquation = line().x(d => xCoords(d.date)).y(d => yCoords(d.avgWPM));
    let xAxisEquation = axisBottom(xCoords);
    let yAxisEquation = axisLeft(yCoords);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* <Grid height={height - heightDiff} grid={yGrid} gridType="y" /> */}
          <path className="line" d={lineEquation(data)} />
          <Dots data={data} x={xCoords} y={yCoords} showTooltip={this.showTooltip} hideTooltip={this.hideTooltip} />
          <Axis height={height - heightDiff} axis={yAxisEquation} axisType="y" />
          <Axis height={height - heightDiff} axis={xAxisEquation} axisType="x" />
          <Tooltip tooltip={this.state.tooltip} />
        </g>
      </svg>
    );
  }
}
const margin = {top: 20, right: 20, bottom: 30, left: 50};

const mapState = (state, {data, width, height, label}) => ({
  margin,
  data,
  width,
  height,
  label,
});

export default connect(mapState, null)(Chart);
