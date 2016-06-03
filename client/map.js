import GoogleMapsLoader from 'google-maps';
import getData from './getData';
import { defaultZoom, denverLatitude, denverLongitude } from './constants/graphConstants';
import {
  Metro_Denver_Federally_Subsidized_Affordable_Housing_2014_id
} from './constants/datasetConstants';

GoogleMapsLoader.VERSION = '3.23';

function initMap(mapEl) {
  return new Promise((resolve, reject) => {
    GoogleMapsLoader.load((google) => {
      const map = new google.maps.Map(mapEl, {
        center: { lat: denverLatitude, lng: denverLongitude },
        zoom: defaultZoom
      });

      resolve({ google, map });
    });
  });
}

function addDataToMap({ google, map }, data) {
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
      map,
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
}

export default function makeMap() {
  const mapEl = document.getElementById('map');

  Promise.all([
    initMap(mapEl),
    getData(Metro_Denver_Federally_Subsidized_Affordable_Housing_2014_id)
  ]).then(([{ google, map }, data]) => {
    addDataToMap({ google, map }, data);
  });
}
