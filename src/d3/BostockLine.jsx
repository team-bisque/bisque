import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import { select, getAttribute } from 'd3-selection';
import {scaleTime} from 'd3-scale';
import {timeParse} from 'd3-time-format';

export class BostockLine extends Component {

  componentDidMount() {
    // Select the element
    const svg = d3.select('svg');

    // Setting conventional margins
    // https://bl.ocks.org/mbostock/3019563
    const margin = {top: 20, right: 20, bottom: 30, left: 50};

    // Defining the W&H of the graph, based on:
    // our margins and the W&H of the svg element
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    //
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create a time parsing function
    const parseTime = d3.timeParse('%d-%b-%y');

    // define and label x axis
    const x = scaleTime()
        .rangeRound([0, width]); // Left to right

    // define y axis
    const y = d3.scaleLinear()
        .rangeRound([height, 0]); // Top to bottom

    // define how to construct a line
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));

    const formattedData = this.props.data.map(d => {
      return {
        close: +d.close,
        date: parseTime(d.date)
      };
    });

    x.domain(d3.extent(formattedData, d => d.date));
    y.domain(d3.extent(formattedData, d => d.close));

    g.append('g')
      .attr('transform', `translate(0,${this.props.height})`) // Creates relative coords for data points
      .call(d3.axisBottom(x))
    .select('.domain')
      .remove();

    // y-axis label
    g.append('g') // Appending to our SVG element
      .call(d3.axisLeft(y)) // Selects the left axis
    .append('text') // Adding a text label to the Y axis
      .attr('fill', '#fff') // text color
      .attr('transform', 'rotate(-90)') // orientation
      .attr('y', 6) // position
      .attr('dy', '0.7em') // distance from the y axis (larger em = further to the right)
      .attr('text-anchor', 'end') // Anchors the text by the last character
      .text('Price ($)'); // The text

    // lines
    // for styles, see http://www.d3noob.org/2014/02/styles-in-d3js.html
    g.append('path') // We are using SVGs so we use path
      .datum(formattedData) // Data from which to make lines
      .attr('fill', 'none') // color of space between a line and the graph's meridian
      .attr('stroke', 'white') // color of the line
      .attr('stroke-linejoin', 'round') // removes hard edges from intersections
      .attr('stroke-linecap', 'round') // removes hard edges from lines
      .attr('stroke-width', 1.5) // width
      .attr('d', line); // draw the line
  }

  render() {
    return (<svg width={this.props.width} height={this.props.height}></svg>);
  }
}

const mapState = (state, {data, width, height}) => ({data, width, height});

export default connect(mapState, null)(BostockLine);
