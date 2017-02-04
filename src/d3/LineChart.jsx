import React, {Component} from 'react';
import connect from 'react-redux';
import d3 from 'd3';

import Chart from './Chart';
import DataSeries from './DataSeries';

const width = 600;
const height = 300;

class LineChart extends Component{
  // componentDidMount() {
  //   var el = this.getDOMNode();
  //   d3Chart.create(el, {
  //     width: '100%',
  //     height: '300px'
  //   }, this.getChartState());
  // }
  //
  // componentDidUpdate() {
  //   var el = this.getDOMNode();
  //   d3Chart.update(el, this.getChartState());
  // }
  //
  // getChartState() {
  //   return {
  //     data: this.props.data,
  //     domain: this.props.domain
  //   };
  // }
  //
  // componentWillUnmount() {
  //   var el = this.getDOMNode();
  //   d3Chart.destroy(el);
  // }

  render() {
//     var data = this.props.data;
//     var size = {width: this.props.width, height: this.props.height };
//     var max = _.chain(data.series1, data.series2, data.series3)
//             .zip()
//             .map(function(values) {
//               return _.reduce(values, function(memo, value) { return Math.max(memo, value.y); }, 0);
//             })
//             .max()
//             .value();
//
//     var xScale = d3.scale.linear()
//             .domain([0, 6])
//             .range([0, this.props.width]);
//
//     var yScale = d3.scale.linear()
//       .domain([0, max])
//       .range([this.props.height, 0]);
//     return (
//       <Chart width={this.props.width} height={this.props.height}>
//         <DataSeries data={data.series1} size={size} xScale={xScale} yScale={yScale} ref="series1" color="cornflowerblue" />
//         <DataSeries data={data.series2} size={size} xScale={xScale} yScale={yScale} ref="series2" color="red" />
//         <DataSeries data={data.series3} size={size} xScale={xScale} yScale={yScale} ref="series3" color="green" />
//       </Chart>
//     );
//   }
// }

const mapState = ({state}, {data}) => ({
  data: data,
  width: width,
  height: height});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(LineChart);
