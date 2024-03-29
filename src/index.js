import './css/base.scss';
import apiFetch from './apiFetch';
import Guest from './Guest'
import moment from 'moment';
import domUpdates from './domUpdates'
import Manager from './Manager'
import './images/home-background.jpg'

let todaysDate = moment().format('YYYY/MM/DD');
let allGuests;
let allRooms;
let allBookings;
let guest;
let manager;

// Manager Fetch //
function fetchHotelData() { 
  allGuests = apiFetch.getAllGuestData();
  allBookings = apiFetch.getAllBookingsData();
  allRooms = apiFetch.getAllRoomsData();
  return Promise.all([allGuests, allBookings, allRooms])
    .then((data) => {
      instantiateManager(data[0].users, data[1].bookings, data[2].rooms);
    })
    .catch(err => console.log(err.message));
}

// Guest Fetch //
function fetchGuestData(guestId) {
  allGuests = apiFetch.getAllGuestData();
  allBookings = apiFetch.getAllBookingsData();
  allRooms = apiFetch.getAllRoomsData();
  return Promise.all([allGuests, allBookings, allRooms])
    .then((data) => {
      instantiateGuest(guestId, data[0].users, data[1].bookings, data[2].rooms);
    })
    .catch(err => console.log(err.message));
}

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
    });
  });
}

// INSTANTIATION //
const instantiateManager = (allGuests, allBookings, allRooms) => {
  addRoomInfoToBooking(allBookings, allRooms);
  manager = new Manager(allGuests, allBookings, allRooms, todaysDate);
  return manager;
}

const instantiateGuest = (guestId, allGuests, allBookings, allRooms) => {
  addRoomInfoToBooking(allBookings, allRooms);
  let currentGuest = allGuests.find(guest => guest.id === guestId);
  let guestBookings = allBookings.filter(booking => booking.userID === guestId);
  guest = new Guest(guestId, currentGuest.name, guestBookings);
  domUpdates.displayGuestDashboard(guest);
  return guest; 
}

// Login validation //
const validateLogin = () => {
  event.preventDefault()
  let username = document.querySelector('.username');
  let password = document.querySelector('.password');
  if (username.value === 'manager' && password.value === 'overlook2020') {
    fetchHotelData();
    domUpdates.displayManagerDashboard(manager);
  } else if ((password.value === 'overlook2020' && username.value.slice(0, 8) === 'customer' && username.value.slice(8) <= 50)) {
    let guestId = Number(username.value.slice(8));
    fetchGuestData(guestId);
  } else {
    domUpdates.displayLoginError();
  }
}

const processSearchInput = () => { 
  let roomTypeInput = document.querySelector('.room-type-dropdown');
  let dateInput = document.querySelector('.selected-date');
  dateInput = dateInput.value.split('-').join('/');
  if (dateInput < todaysDate) {
    event.preventDefault();
    domUpdates.displayDateError();
  } else {
    domUpdates.findAvailRoomsPerSearch(manager, dateInput, roomTypeInput.value);
    document.querySelector('.search-results').addEventListener('click', makeNewBooking);
  }
}

const displayBookingForm = () => {
  domUpdates.showBookingForm()
  document.querySelector('.search-rooms-button').addEventListener('click', processSearchInput);
}

const postNewBooking = (guestId, dateOfBooking, roomNum) => {
  let newBooking = {
    userID: guestId, 
    date: dateOfBooking, 
    roomNumber: Number(roomNum)
  }
  apiFetch.postNewBooking(newBooking)
    .then(() => apiFetch.getAllBookingsData())
    .then((response) => {
      console.log(response);
    })
    .then(() => {
      fetchHotelData(); 
    })
    .catch((err) => console.log(err))
}

const makeNewBooking = (event) => {
  if (event.target.classList.contains('book-room-button')) {
    let roomNumber = event.target.parentNode.id
    let dateInput = document.querySelector('.selected-date');
    dateInput = dateInput.value.split('-').join('/');
    postNewBooking(guest.id, dateInput, roomNumber);
    alert('You have made a new Reservation');
  }
}

const findGuestInfo = () => {
  let nameInput = document.querySelector('.search-guest-input');
  domUpdates.displayFoundGuest(manager, nameInput.value, guest);
}

document.querySelector('.login-submit').addEventListener('click', validateLogin)
document.querySelector('.reservation-button').addEventListener('click', displayBookingForm);
document.querySelector('.search-guest-button').addEventListener('click', findGuestInfo);
window.addEventListener('load', fetchHotelData);