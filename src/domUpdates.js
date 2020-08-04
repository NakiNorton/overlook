let domUpdates = {

  displayLoginError() {
    document.querySelector('.login-error').innerText = 'Username or password is incorrect'
  },

  displayDateError() {
    document.querySelector('.date-error').innerText = 'Please enter a future date'
  },

  showBookingForm() {
    let guestForm = document.querySelector('.guest-dashboard')
    guestForm.classList.add('hide')
    let bookingForm = document.querySelector('.booking-display')
    bookingForm.classList.remove('hide')
  },

  displayManagerBookingForm() {
    let managerDash = document.querySelector('.manager-dashboard')
    managerDash.classList.add('hide')
    let bookingForm = document.querySelector('.booking-display')
    bookingForm.classList.remove('hide')

  },

  displayGuestDashboard(guest) {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide')
    let guestForm = document.querySelector('.guest-dashboard')
    guestForm.classList.remove('hide')
    document.querySelector('.guest-name').innerText = `Welcome, ${guest.getGuestFirstName()}!`
    document.querySelector('.guest-money-spent').insertAdjacentHTML('beforeend', `<p>$${guest.getTotalCostOfRooms()}</p>`)
    this.displayGuestBookings(guest.guestBookings, 'guest')
  },

  displayGuestBookings(guestBookings, user) {
    document.querySelector(`.${user}-bookings-container`).classList.remove('hide')
    guestBookings.forEach(booking => {
      document.querySelector(`.${user}-bookings-container`).insertAdjacentHTML('beforeend',
        `<p>Reservation Date: ${booking.date}</p>
        <p>Reservation Confirmation: ${booking.id}</p>
        <p>Room Type: ${booking.roomType}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Bed Size: ${booking.bedSize}</p>
        <p>Beds: ${booking.numBeds}</p>
        <p>Bidet: ${booking.bidet}</p>
        <p>Cost Per Night: ${booking.costPerNight}</p>
        <div class='card-line'></div>
      `)
    })
  },

  findAvailRoomsPerSearch(manager, date, roomType) {
    let availRooms;
    if (roomType !== 'all rooms') {  
      manager.findAvailableRooms(date)
      availRooms = manager.filterByRoomType(roomType)
    } else {
      availRooms = manager.findAvailableRooms(date)
    }
    
    if (availRooms.length === 0) {
      document.querySelector('.no-search-results').classList.remove('hide')
    } else {
      this.displayAvailableRooms(availRooms)
    }
  },

  displayAvailableRooms(availRooms) {
    event.preventDefault()
    let roomsArea = document.querySelector('.available-rooms-container')
    roomsArea.innerText = '';
    roomsArea.classList.remove('hide')
    

    
    availRooms.forEach(room => {
      document.querySelector('.available-rooms-container').insertAdjacentHTML('beforeend',
        `<article class='booking' id=${room.number}>
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Beds: ${room.numBeds}</p>
        <p>Cost Per Night: ${room.costPerNight}</p>
        <button class='book-room-button'>Book Room</button>
        <div class='card-line'></div>
      `)
    })
  },

  displayManagerDashboard(manager) {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide') 
    let guestForm = document.querySelector('.manager-dashboard')
    guestForm.classList.remove('hide')
    document.querySelector('.rooms-available-today').insertAdjacentHTML('beforeend', `<p>${manager.getTotalRoomsAvailable()}</p>`)
    document.querySelector('.revenue-today').insertAdjacentHTML('beforeend', `<p>$${manager.calculateTodaysRevenue()}</p>`)
    document.querySelector('.rooms-percentage').insertAdjacentHTML('beforeend', `<p>${manager.getPercentageOfOccupiedRooms()}%</p>`)
  },

  displayFoundGuest(manager, nameInput) {
    let foundGuest = manager.findGuestByName(nameInput) 
    let guestInfo = document.querySelector('.found-guest-info')
    guestInfo.classList.remove('hide')
    guestInfo.innerHTML += `<p>Name: ${foundGuest.name}</p>`
    let guestBookings = manager.findGuestBookings(foundGuest.id)
 console.log('G', guestBookings)
    this.displayGuestBookings(guestBookings, 'manager')
        

  }
}


export default domUpdates;