import React from 'react';
import BarChart from './BarChart';
import Map from './Map';

export default class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <BarChart />
        <Map />
      </div>
    );
  }
}
