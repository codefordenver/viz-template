import React from 'react';
import makeBarChart from '../vizualizations/barChart';

export default class Main extends React.Component {
  componentDidMount() {
    makeBarChart();
  }

  render() {
    return (
      <div id="viz"></div>
    );
  }
}
