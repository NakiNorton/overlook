class Guest {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.bookings = []; // getGuestBookings() from Booking class ???
    // or empty array to push into?
  }

  getGuestFirstName() {
    const firstName = this.name.split(' ')[0];
    return firstName;
  }

  getGuestBookings(bookings) {
    return bookings.filter(booking => {
      if (booking.userID === this.id) {
        this.bookings.push(booking)
      }
    })
  }

  // getTotalCostOfRooms() {
  //  iterate over booking array
  // iterate over rooms data
  // filter by matching id's

  // }

}

export default Guest;