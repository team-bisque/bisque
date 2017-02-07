import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import { select, getAttribute } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import { axisLeft, axisBottom } from 'd3-axis';

export class Line extends Component {
  constructor(props) {
    super(props);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentDidMount() {
    // Setting conventional margins
    // https://bl.ocks.org/mbostock/3019563
    const margin = {top: 20, right: 20, bottom: 30, left: 50};

    // Defining the W&H of the graph, based on
    // our margins and the W&H of the svg element
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    // dates are coming in as day-month-year
    // D3 can parse that back into a date-time object it can use
    let parseTime = d3.timeParse('%d-%b-%y');

    // define the ranges of the axes
    const x = d3.scaleTime().range([0, width]); // Left to right
    const y = d3.scaleLinear().range([height, 0]); // Top to bottom

    // define the svg path for the line
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

    // D3 works from the top left and expands outwards
    // so first we must affix the y axis to the top left corner
    // We pass translate the margins so they are respected
    const g = d3.select('svg')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // affix and create the x axis at the bottom of the y axis
    g.append('g')
      .call(d3.axisBottom(x)) // create the X axis
      .attr('transform', `translate(0,${height})`) // place it below the graph
      .attr('class', 'axis') // Provide CSS

    // create the y-axis and add a label
    g.append('g')
      .call(d3.axisLeft(y))
      .attr('class', 'axis')
    .append('text') // Adding a text label to the Y axis
      .attr('transform', 'rotate(-90)') // orientation
      .attr('y', 6) // position
      .attr('dy', '0.7em') // distance from the y axis
      .attr('text-anchor', 'end')
      .attr('font-size', '1.2em')
      .text(this.props.label);

    // append the svg line to the graph
    // for styles, see http://www.d3noob.org/2014/02/styles-in-d3js.html
    const l = g.append('path')
      .datum(formattedData)
      .attr('class', 'line') // Provide CSS
      .attr('d', line); // provide the svg path for drawing

    // Defining the vertical line style
    d3.select('svg').append('path')
        .attr('class', 'remove') // wipe old styles
      .style('position', 'absolute')
      .style('z-index', '4')
      .style('width', '1px')
      .style('height', '480px')
      .style('top', '10px')
      .style('bottom', '30px')
      .style('left', '0px')
      .style('background', '#fff');

    // Mouseover events for vertical line
    d3.select('svg')
      .on('mousemove', this.handleMouseMove)
      .on('mouseover', this.handleMouseOver)
  }

  handleMouseMove() {
    let mousex = d3.mouse(this)
    mousex = mousex[0] + 5;
    console.log(mousex);
    d3.select('guide')
      .style('left', mousex + 'px')
  }

  handleMouseOver() {
    let mousex = d3.mouse(this)
    mousex = mousex[0] + 5;
    d3.select('guide')
      .style('left', mousex + 'px')
  }

  render() {
    return (<svg width={this.props.width} height={this.props.height} />);
  }
}

const mapState = (state, {data, width, height, label}) =>
  ({data, width, height, label});

export default connect(mapState, null)(Line);
