import getData from './getData';
import d3 from 'd3';
import _ from 'lodash';

export default function makeGraph() {
  getData(1033, (data) => {
    const filteredData = _.map(data, d => d['county_metro_healthvarious_2009.bmi_all']);
    const x = d3.scale.linear().domain([0, d3.max(filteredData)]).range([0, 100])
    d3.select('#viz')
      .selectAll('div')
      .data(filteredData)
      .enter().append('div')
      .style('width', (d) => x(d) + 'px')
      .style('background-color', () => 'steelblue')
      .style('margin', () => '5px')
      .text( d => d);
  });
}
