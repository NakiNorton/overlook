const domUpdates = {

  // hideLoginForm() {
  // document.querySelector.add('hide')

  // },

  displayGuestDashboard() {
    let loginForm = document.querySelector('.login-form-container')
    loginForm.classList.add('hide')
    let guestForm = document.querySelector('.guest-dashboard')
    guestForm.classList.remove('hide')
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