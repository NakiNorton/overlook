import Guest from './Guest'

let domUpdates = {

  // hideLoginForm() {
  // document.querySelector.add('hide')

  // },

  displayGuestDashboard(guest) {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide')
    let guestForm = document.querySelector('.guest-dashboard')
    guestForm.classList.remove('hide')
    document.querySelector('.guest-name').innerText = `${guest.getGuestFirstName()}`
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

  // displayAvailableRooms() {
  
  // },

  

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