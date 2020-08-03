import Guest from './Guest'
import Manager from './Manager'

let domUpdates = {

  // hideLoginForm() {
  // document.querySelector.add('hide')

  // },

  displayGuestDashboard(guest) {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide')
    let guestForm = document.querySelector('.guest-dashboard')
    guestForm.classList.remove('hide')
    document.querySelector('.guest-name').innerText = `Welcome back ${guest.getGuestFirstName()}!`
    document.querySelector('.guest-money-spent').insertAdjacentHTML('beforeend', `${guest.getTotalCostOfRooms()}`)
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
    // how to refresh search ???
    let availRooms;
    console.log(roomType)

    document.querySelector('.no-search-results').classList.add('hide')
    document.querySelector('.search-rooms-header').classList.remove('hide')
    if (roomType !== 'all rooms') { //then filter by type 
      manager.findAvailableRooms(date)
      let filteredAvailRooms = manager.filterByRoomType(roomType)
      availRooms = filteredAvailRooms
      console.log('filtered:', filteredAvailRooms)
    } else {
      let allAvailRooms = manager.findAvailableRooms(date)
      availRooms = allAvailRooms
      console.log('all avail:', allAvailRooms)
    }
     // *** DOESN'T WORK 
    // if (manager.bookedRooms.length === 25) {
    // document.querySelector('.no-search-results').classList.remove('hide')
    // }
    
    availRooms.forEach(room => {
      document.querySelector('.available-rooms-container').insertAdjacentHTML('afterend',
        `<p>Room Number: ${room.number}</p>
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

  

  displayManagerDashboard() {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide')
    let guestForm = document.querySelector('.manager-dashboard')
    guestForm.classList.remove('hide')
  },

  // {/* <h2 class=('guest-name')>Guest Name</h2>
  //   <h2 class='guest-money-spent')>Amount spent</h2>  
  // } */}

}

export default domUpdates;