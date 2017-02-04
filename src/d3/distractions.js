import d3 from 'd3';

const data = [
  { minute: 60000, pages: {facebook: 5, buzzfeed: 2}},
  { minute: 120000, pages: {facebook: 2, buzzfeed: 0}},
  { minute: 180000, pages: {facebook: 1, buzzfeed: 0, etsy: 8}},
  { minute: 240000, pages: {etsy: 12}}
];

class distractionsChart {
  constructor(el, props, state) {
    this.el = el;
    this.props = props;
    this.state = state;
  }
}

const svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const formatMillisecond = d3.timeFormat('.%L')

const x = d3.scaleTime()
            .rangeRound([0, width]);
const y = d3.scaleLinear()
            .rangeRound([height, 0]);
const line = d3.line()
              .x(d => x(d.minute))
              .y(d => y(d.distractions))

const organizeData = (data, filter) => {
  data.minute = formatMillisecond(data.minute);
  data.distractions = d => {
    return Object.keys(d).reduce((sum, val) => {
      if (!filter) return sum + d[val];
      if (filter === val) return sum + d[val];
    }, 0);
  };
};

d3.json(data, d => {
  d.minute = parseTime(d.minute);
  d.close = +d.close;
  return d
})
