import './css/base.scss';
import apiFetch from './apiFetch';
import Hotel from './Hotel'
import Guest from './Guest'
import moment from 'moment';
import domUpdates from './domUpdates'
import Manager from './Manager'
// import User from './User';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/home-background.jpg'

// Global variables //
let todaysDate = moment().format('YYYY/MM/DD');
let allGuests;
let allRooms;
let allBookings;
let guestId;
// let manager;
let guest;
let hotel;
let manager;


// Data Fetch //

function fetchManagerData() { //change to fetchManagerData
  allGuests = apiFetch.getAllGuestData();
  allBookings = apiFetch.getAllBookingsData();
  allRooms = apiFetch.getAllRoomsData();

  return Promise.all([allGuests, allBookings, allRooms])
    .then((data) => {
      setUpHotel(data[0].users, data[1].bookings, data[2].rooms)
      instantiateManager()
    })
    .catch(err => console.log(err.message))
}

function fetchGuestData(guestId) {
  allGuests = apiFetch.getAllGuestData();
  allBookings = apiFetch.getAllBookingsData();
  allRooms = apiFetch.getAllRoomsData();

  return Promise.all([allGuests, allBookings, allRooms])
    .then((data) => {
      setUpHotel(data[0].users, data[1].bookings, data[2].rooms)
      instantiateGuest(guestId, data[0].users, data[1].bookings)
    })
    .catch(err => console.log(err.message))
}

const instantiateManager = () => {
  manager = new Manager('test')
  console.log(manager)

}


const instantiateGuest = (guestId, allGuests, allBookings) => {
  console.log(allGuests)
  let currentGuest = allGuests.find(guest => guest.id === guestId)
  let guestBookings = allBookings.filter(booking => booking.userID === guestId)
  guest = new Guest(guestId, currentGuest.name, guestBookings)
  console.log('guest:', guest)
  // return guest;
}

const setUpHotel = (allGuests, allBookings, allRooms) => {
  hotel = new Hotel(allGuests, allBookings, allRooms, todaysDate)
  console.log(hotel)

}
////// Login validation ///////////

const validateUsername = (usernameInput) => {
  if (usernameInput.value === 'manager') {
    fetchManagerData()
    // domUpdates.displayManagerDashboard()
  } else if (usernameInput.value.slice(0, 8) === 'customer' && usernameInput.value.slice(8) <= 50 ) {
    guestId = Number(usernameInput.value.slice(8))
    console.log('successful login', guestId) 
    fetchGuestData(guestId)
    domUpdates.displayGuestDashboard()
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
// window.addEventListener('load', fetchAllHotelData)