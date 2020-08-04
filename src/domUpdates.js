let domUpdates = {

  showBookingForm() {
    let guestForm = document.querySelector('.guest-dashboard')
    guestForm.classList.add('hide')
    let bookingForm = document.querySelector('.booking-display')
    bookingForm.classList.remove('hide')
   
  },

  displayGuestDashboard(guest) {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide')
    let guestForm = document.querySelector('.guest-dashboard')
    guestForm.classList.remove('hide')
    document.querySelector('.guest-name').innerText = `Welcome back ${guest.getGuestFirstName()}!`
    document.querySelector('.guest-money-spent').insertAdjacentHTML('beforeend', `$${guest.getTotalCostOfRooms()}`)
    this.displayGuestBookings(guest)
  },

  displayGuestBookings(guest) {
    const guestBookings = guest.guestBookings;
    console.log('guest bookings', guestBookings)
    guestBookings.forEach(booking => {
      document.querySelector('.guest-bookings-container').insertAdjacentHTML('beforeend',
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

  displayAvailableRooms(manager, date, roomType) {
    event.preventDefault()
    let roomDisplayArea = document.querySelector('.available-rooms-container')
    roomDisplayArea.innerHTML = '';
    // document.querySelector('.search-results').classList.remove('hide')
    let availRooms;
   
    // how to refresh search ???
    
  
   
    if (roomType !== 'all rooms') { //then filter by type 
      manager.findAvailableRooms(date)
      let filteredAvailRooms = manager.filterByRoomType(roomType)
      availRooms = filteredAvailRooms
      console.log('check1:', availRooms)
    } else {
      let allAvailRooms = manager.findAvailableRooms(date)
      availRooms = allAvailRooms
      console.log('check2:', availRooms)
    }
     // *** DOESN'T WORK 
    // if (manager.bookedRooms.length === 25) {
    // document.querySelector('.no-search-results').classList.remove('hide')
    // }
   console.log('check3', availRooms)
    availRooms.forEach(room => {
      roomDisplayArea.innerHTML +=
        `<article class='booking' id=${room.number}>
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Beds: ${room.numBeds}</p>
        <p>Cost Per Night: ${room.costPerNight}</p>
        <button class='book-room-button'>Book Room</button>
        <div class='card-line'></div>
      `
    })
  },

  displayManagerDashboard(manager) {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide')
    let guestForm = document.querySelector('.manager-dashboard')
    guestForm.classList.remove('hide')
    document.querySelector('.rooms-available-today').insertAdjacentHTML('beforeend', `$${manager.getTotalRoomsAvailable()}`)

    document.querySelector('.revenue-today').insertAdjacentHTML('beforeend', `$${manager.calculateTodaysRevenue()}`)


      // < h3 class='rooms-available-today' > Total Rooms Available Today: </h3 >
      //   <h3 class='revenue-today'>Today's Revenue: </h3>
      //   <h3 class='rooms-percentage'>Percentage of Rooms Available Today: </h3>
  },
}

export default domUpdates;