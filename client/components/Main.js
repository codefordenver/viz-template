import React from 'react';
import makeGraph from '../barChart';
import makeMap from '../map'

export default class Main extends React.Component {
  componentDidMount() {
    makeGraph();
    makeMap();
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
