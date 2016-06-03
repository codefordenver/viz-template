
import $ from 'jquery';
import { apiKey } from './constants/apiConstants';

export default function getData(id, cb) {
  return $.ajax({
    url: `http://codataengine.org/api/dataset/${id}.jsonp?start=0&limit=350&key=${apiKey}`,
    dataType: 'jsonp',
    success: cb
  });
}
