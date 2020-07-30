// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// test push

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import apiFetch from './apiFetch';
import hotel from './Hotel'
// import Room from './Room'
// import Booking from './Booking'
// import Guest from './Guest'
import moment from 'moment';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// Global variables //
let todaysDate = moment().format('YYYY/MM/DD');


function fetchAllHotelData() {
  return Promise.all([
    apiFetch.getAllGuestData(),
    apiFetch.getAllBookingsData(),
    apiFetch.getAllRoomsData(),
  ])
  .then((data) => {
     return data;
  })
  .then((data) => {
    hotel.defineHotelData(data[0], data[1], data[2], todaysDate)
    console.log('hotel', hotel)
  })  
  
}


// on window load//
window.addEventListener('load', fetchAllHotelData)