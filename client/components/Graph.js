import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import d3 from 'd3';

import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.VERSION = '3.23';

import style from './graph.css';

function getData(id, cb) {
  $.ajax({
    url: `http://codataengine.org/api/dataset/${id}.jsonp?start=0&limit=350&key=49a19ed77c416266d2370caeb7f280d9.33105`,
    dataType: 'jsonp',
    success: cb
  });
}

function graph() {
  getData(1033, (data) => {
    const filteredData = _.map(data, d => d['county_metro_healthvarious_2009.bmi_all']);
    const x = d3.scale.linear().domain([0, d3.max(filteredData)]).range([0, 100])

    d3.select("#viz")
      .selectAll("div")
      .data(filteredData)
      .enter().append("div")
      .style("width", (d) => x(d) + 'px')
      .style('background-color', () => 'steelblue')
      .style('margin', () => '5px')
      .text( d => d);
  });
}

export default
class Graph extends React.Component {
  componentDidMount() {
    graph();

    let map;

    const mapEl = document.getElementById('map');

    GoogleMapsLoader.load((google) => {
      map = new google.maps.Map(mapEl, {
        center: {lat: 39.7392, lng: -104.9903},
        zoom: 10
      });

      getData(222089, data => {
        const markers = [];

        data.forEach(point => {
          const loc = {
            lng: parseFloat(point['affhousing_metro_fedsubsidized_2014.x'], 10),
            lat: parseFloat(point['affhousing_metro_fedsubsidized_2014.y'], 10)
          };
          const units = point['affhousing_metro_fedsubsidized_2014.restunit'];
          const color = `#${(units & 0xFF).toString(16)}${(-units & 0xFF).toString(16).repeat(2)}`;

          new google.maps.Circle({
            strokeWeight: 0,
            fillColor: color,
            fillOpacity: 0.65,
            map: map,
            center: loc,
            radius: 700,
            title: `Total Subsidized Units: ${units}`
          });

          markers.push(new google.maps.Marker({
            position: loc,
            map,
            title: `Total Subsidized Units: ${point['affhousing_metro_fedsubsidized_2014.restunit']}`
          }));
        });
      });
    });
  }

  render() {
    const mapStyle = { width: '100%', height: '600px' };

    return (
      <div id="yo">
        <div id="viz"></div>
        <div id="map" style={ mapStyle } />
      </div>
    );
  }
}
