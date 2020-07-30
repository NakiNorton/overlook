let apiFetch = {
    getAllGuestData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .catch(err => console.log(err.message))
    },

    getSingleGuestData(id) {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users${id}`)
      .then(response => response.json())
      .catch(err => console.log(err.message))
    },

    getAllBookingsData() {
      return fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings`)
      .then(response => response.json())
      .catch(err => console.log(err.message))
    },

    getAllRoomsData() {
      return fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms`)
        .then(response => response.json())
        .catch(err => console.log(err.message))
    }

}

export default apiFetch;
