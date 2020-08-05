class Guest {
  constructor(guestId, name, bookings) {
    this.id = guestId;
    this.name = name;
    this.guestBookings = this.checkIfDataIsAnObject(bookings);
  }

  checkIfDataIsAnObject(data) {
    return data instanceof Object
      ? data : 'Guest bookings cannot be found'
  }

  getGuestFirstName() {
    const firstName = this.name.split(' ')[0];
    return firstName;
  }

  getTotalCostOfRooms() {
    return Number(this.guestBookings.reduce((total, booking) => {
      return total + booking.costPerNight
    }, 0).toFixed(2))
  }

}

export default Guest;