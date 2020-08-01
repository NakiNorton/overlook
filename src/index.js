import './css/base.scss';
import apiFetch from './apiFetch';
import Hotel from './Manager'
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

function fetchManagerData() { //change to fetchManagerData
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
}

const instantiateGuest = (guestId, allGuests, allBookings, allRooms) => {
  addRoomInfoToBooking(allBookings, allRooms)
  let currentGuest = allGuests.find(guest => guest.id === guestId)
  let guestBookings = allBookings.filter(booking => booking.userID === guestId)
  guest = new Guest(guestId, currentGuest.name, guestBookings)
  console.log('guest:', guest)
  return guest // do I need to return this?
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
    // domUpdates.displayGuestDashboard()
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