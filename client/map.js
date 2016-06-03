import GoogleMapsLoader from 'google-maps';
import getData from './getData';
import { defaultZoom, denverLatitude, denverLongitude } from './constants/graphConstants';

GoogleMapsLoader.VERSION = '3.23';

export default function makeMap() {
  const mapEl = document.getElementById('map');
  let map;

  const googleMapsPromise = new Promise((resolve, reject) => {
    GoogleMapsLoader.load((google) => {
      map = new google.maps.Map(mapEl, {
        center: { lat: denverLatitude, lng: denverLongitude },
        zoom: defaultZoom
      });

      resolve(google);
    });
  });

  Promise.all([
    googleMapsPromise,
    getData(222089)
  ]).then(([google, data]) => {
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
}
