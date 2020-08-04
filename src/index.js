import './css/base.scss';
import apiFetch from './apiFetch';
import Guest from './Guest'
import moment from 'moment';
import domUpdates from './domUpdates'
import Manager from './Manager'

import './images/home-background.jpg'

// Global variables //
let todaysDate = moment().format('YYYY/MM/DD');
let allGuests;
let allRooms;
let allBookings;
let guestId;
let guest;
let manager;

const addRoomInfoToBooking = (bookings, rooms) => {
  return bookings.map(booking => {
    rooms.forEach(room => {
      if (room.number === booking.roomNumber) {
        booking.roomType = room.roomType,
        booking.bidet = room.bidet,
        booking.bedSize = room.bedSize,
        booking.numBeds = room.numBeds,
        booking.costPerNight = room.costPerNight
      }
    })
  })
}

// Manager Fetch //
function fetchManagerData() { 
  allGuests = apiFetch.getAllGuestData();
  allBookings = apiFetch.getAllBookingsData();
  allRooms = apiFetch.getAllRoomsData();

  return Promise.all([allGuests, allBookings, allRooms])
    .then((data) => {
      instantiateManager(data[0].users, data[1].bookings, data[2].rooms)
    })
    .catch(err => console.log(err.message))
}

// Guest Fetch //
function fetchGuestData(guestId) {
  allGuests = apiFetch.getAllGuestData();
  allBookings = apiFetch.getAllBookingsData();
  allRooms = apiFetch.getAllRoomsData();

  return Promise.all([allGuests, allBookings, allRooms])
    .then((data) => {
      instantiateGuest(guestId, data[0].users, data[1].bookings, data[2].rooms)
    })
    .catch(err => console.log(err.message))
}

// INSTANTIATION //
const instantiateManager = (allGuests, allBookings, allRooms) => {
  addRoomInfoToBooking(allBookings, allRooms)
  manager = new Manager(allGuests, allBookings, allRooms, todaysDate)
  console.log(manager)
  return manager // do I need to return this?
}

const instantiateGuest = (guestId, allGuests, allBookings, allRooms) => {
  addRoomInfoToBooking(allBookings, allRooms)
  let currentGuest = allGuests.find(guest => guest.id === guestId)
  let guestBookings = allBookings.filter(booking => booking.userID === guestId)
  guest = new Guest(guestId, currentGuest.name, guestBookings)
  domUpdates.displayGuestDashboard(guest)
  return guest // do I need to return this?
}

////// Login validation ///////////
const validateUsername = (usernameInput) => {
  if (usernameInput.value === 'manager') {
    // fetchManagerData() // changed to fetch data on load
    // domUpdates.displayManagerDashboard()
  } else if (usernameInput.value.slice(0, 8) === 'customer' && usernameInput.value.slice(8) <= 50 ) {
    guestId = Number(usernameInput.value.slice(8))
    console.log('successful login', guestId) 
    fetchGuestData(guestId)
  } else {
    console.log('error')
  }
}

// Need to refactor validation process
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
 
const processSearchInput = () => { 
  let roomTypeInput = document.querySelector('.room-type-dropdown')
  console.log('room input', roomTypeInput.value)
  let dateInput = document.querySelector('.selected-date')
  dateInput = dateInput.value.split('-').join('/')
  domUpdates.displayAvailableRooms(manager, dateInput, roomTypeInput.value)
  document.querySelector('.search-results').addEventListener('click', makeNewBooking)
}

const displayBookingForm = () => {
  domUpdates.showBookingForm()
  document.querySelector('.search-rooms-button').addEventListener('click', processSearchInput)
}


const postNewBooking = (date, id) => {
console.log('post:', date, id)



}

const makeNewBooking = (event) => {
  if (event.target.classList.contains('book-room-button')) {
     console.log('clicked') 
    }
    let bookingId = event.target.parentNode.id
    console.log(bookingId)
  let dateInput = document.querySelector('.selected-date')
  dateInput = dateInput.value.split('-').join('/')
  console.log(dateInput)
  postNewBooking(dateInput, guest.id)
}


// Event listeners //
document.querySelector('.login-submit').addEventListener('click', validateLogin)
document.querySelector('.reservation-button').addEventListener('click', displayBookingForm)
// document.querySelector('body').addEventListener('click', makeNewBooking)
// document.querySelector('.search-rooms-button').addEventListener('click', processSearchInput) // how to make date a required field?

// On window load//
window.addEventListener('load', fetchManagerData)