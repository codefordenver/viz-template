import GoogleMapsLoader from 'google-maps';
import { getJSON, getCoDataEngineData } from '../helpers/dataHelpers';
import { defaultZoom, denverLatitude, denverLongitude } from '../constants/graphConstants';
import tinycolor from 'tinycolor2';
import {
  Metro_Denver_Federally_Subsidized_Affordable_Housing_2014_id
} from '../constants/datasetConstants';

GoogleMapsLoader.VERSION = '3.23';

const limitRadius = 10000;
const numberOfBlocksToGet = 10000;
const geoJSONUrl = 'https://data.colorado.gov/resource/49x6-nvb5.geojson' +
                   `?$where=within_circle(the_geom,${denverLatitude},${denverLongitude},${limitRadius})&$limit=${numberOfBlocksToGet}`;

const blocksPromise = getJSON(geoJSONUrl);
const dataPromise = getCoDataEngineData(Metro_Denver_Federally_Subsidized_Affordable_Housing_2014_id);

function initMap(mapEl) {
  return new Promise((resolve, reject) => {
    GoogleMapsLoader.load((google) => {
      const map = window.map = new google.maps.Map(mapEl, {
        center: { lat: denverLatitude, lng: denverLongitude },
        zoom: defaultZoom
      });

      resolve({ google, map });
    });
  });
}

function addDataToMap({ google, map, data }) {
  const markers = [];

  data.forEach(point => {
    const loc = {
      lng: parseFloat(point['affhousing_metro_fedsubsidized_2014.x'], 10),
      lat: parseFloat(point['affhousing_metro_fedsubsidized_2014.y'], 10)
    };
    // const units = point['affhousing_metro_fedsubsidized_2014.restunit'];
    // const color = `#${(units & 0xFF).toString(16)}${(-units & 0xFF).toString(16).repeat(2)}`;

    // new google.maps.Circle({
    //   strokeWeight: 0,
    //   fillColor: color,
    //   fillOpacity: 0.65,
    //   map,
    //   center: loc,
    //   radius: 700,
    //   title: `Total Subsidized Units: ${units}`
    // });

    markers.push(new google.maps.Marker({
      position: loc,
      map,
      title: `Total Subsidized Units: ${point['affhousing_metro_fedsubsidized_2014.restunit']}`
    }));
  });
}

function getDataForGeoId(geoId, dataSet, dataSetKey) {
  return dataSet.find(datum => datum[dataSetKey] === geoId);
}

export function getColorFromNumber(number) {
  // return `#${(number & 0xFF).toString(16)}${(-number & 0xFF).toString(16).repeat(2)}`;
  const hueScale = 200;
  // const valueScale = 400;

  return tinycolor({
    h: number * 100 / hueScale,
    s: 100,
    v: 100
  }).toHexString();
  // return '#' + ('00000' + (number | 0).toString(16)).substr(-6);
}

function addGeoJsonToMap({ google, map, geoJson, data }) {
  console.log(geoJson);
  const filteredFeatures = geoJson.features.filter(feature => {
    return getDataForGeoId(feature.properties.geoidblock, data, 'affhousing_metro_fedsubsidized_2014.geoid10');
  });
  geoJson.features = filteredFeatures;

  map.data.addGeoJson(geoJson);
  // map.data.setStyle({
  //   fillColor: 'green',
  //   strokeWeight: 1
  // });

  map.data.setStyle(feature => {
    const featureData = getDataForGeoId(feature.H.geoidblock, data, 'affhousing_metro_fedsubsidized_2014.geoid10');
    const affordableUnits = featureData && featureData['affhousing_metro_fedsubsidized_2014.restunit'];
    const color = getColorFromNumber(affordableUnits);

    // console.log(affordableUnits);

    return {
      fillColor: color,
      strokeWeight: 1
    };
  });
}

export default function makeMap() {
  const mapEl = document.getElementById('map');

  Promise.all([
    initMap(mapEl),
    dataPromise
  ]).then(([{ google, map }, data]) => {
    addDataToMap({ google, map, data });

    blocksPromise.then(geoJson => {
      addGeoJsonToMap({ google, map, geoJson, data });
    });
  });
}
