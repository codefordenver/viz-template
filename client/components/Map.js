import React from 'react';
import makeMap, { getColorFromNumber } from '../vizualizations/map';
import _ from 'lodash';

export default class Main extends React.Component {
  componentDidMount() {
    makeMap();
  }

  render() {
    const mapStyle = { width: '100%', height: '600px' };
    const rangeMin = 0;
    const rangeMax = 500;
    const numberOfColors = 6;

    const colors = _.range(numberOfColors).map(i => {
      const percent = 100 / (numberOfColors - 1) * i;
      const value = rangeMin + (rangeMax - rangeMin) / (numberOfColors - 1) * i;
      const color = getColorFromNumber(value);
      return `${color} ${percent}%`;
    });
    const legendStyle = {
      background: `linear-gradient(to right, ${colors.join(', ')})`
    };

    return (
      <div>
        <h2>
          Affordable Housing Units in the Denver Metro Area (2014)
        </h2>

        <div id="map" style={ mapStyle } />

        <div id="legend">
          <h4>
            Legend
          </h4>
          { rangeMin }
          <span id="legendColorBar" style={ legendStyle } />
          { rangeMax }
          <div className="unit">
            Affordable Units
          </div>
        </div>

        <div>
          Datasets:
          <ul>
            <li>
              <a href="http://codataengine.org/find/2014-metro-denver-federally-subsidized-affordable-housing">
                2014 Metro Denver Federally Subsidized Affordable Housing
              </a>
            </li>
            <li>
              <a href="https://data.colorado.gov/Demographics/Census-Blocks-2010/xipb-k5bu">
                Census Blocks 2010
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
