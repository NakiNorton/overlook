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
    document.querySelector('.guest-money-spent').innerText = `Total amount spent: ${guest.getTotalCostOfRooms()}`
   
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