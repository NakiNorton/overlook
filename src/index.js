import './css/base.scss';
import apiFetch from './apiFetch';
import Hotel from './Hotel'
import Guest from './Guest'
import moment from 'moment';
// import User from './User';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// Global variables //
let todaysDate = moment().format('YYYY/MM/DD');
let allGuests;
let allRooms;
let allBookings;
let guestId;


// Data Fetch //

function fetchAllHotelData() {
  allGuests = apiFetch.getAllGuestData();
  allBookings = apiFetch.getAllBookingsData();
  allRooms = apiFetch.getAllRoomsData();

  return Promise.all([allGuests, allBookings, allRooms])
  .then((response) => {
    let hotel = new Hotel(response[0], response[1], response[2], todaysDate)
    console.log(hotel)
  })
 .catch(err => console.log(err.message))
}

// Login validation ///////////

// Put this in it's own User class?


const validateUsername = (usernameInput) => {
  if (usernameInput.value === 'manager') {
    fetchAllHotelData()
    // domUpdates.displayManagerDashboard()
  } else if (usernameInput.value.slice(0, 8) === 'customer' && usernameInput.value.slice(8) <= 50 ) {
    guestId = usernameInput.value.slice(8) 
    console.log('successful login', guestId) // finding out who the guest user is with id.
    // domUpdates.displayGuestDashboard();
  } else {
    console.log('error')
  }
}

const validatePassword = (passwordInput) => {
  (passwordInput.value !== 'overlook2020') ? false : true;
}

const validateLogin = () => {
  let usernameInput = document.querySelector('.username');
  let passwordInput = document.querySelector('.password');

  if (validatePassword(passwordInput) === false) {
    console.log('incorrect password') // domUpdates error message
  } else {
    validateUsername(usernameInput)
  }
}


// Event listeners //
document.querySelector('.login-submit').addEventListener('click', validateLogin)

// On window load//
window.addEventListener('load', fetchAllHotelData)