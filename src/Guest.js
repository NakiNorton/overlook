class Guest {
  constructor(id, name, bookings) {
    this.id = id;
    this.name = name;
    // this.allGuests = allguests;
    this.guestBookings = bookings;
  }

  getGuestFirstName() {
    const firstName = this.name.split(' ')[0];
    return firstName;
  }

  getGuestBookings(hotel) {
    hotel.addRoomInfoToBookings()
    this.guestBookings = hotel.findGuestBookings(this.id)
  }

  getTotalCostOfRooms() {
   return Number(this.guestBookings.reduce((total, booking) => {
      return total + booking.costPerNight
    }, 0).toFixed(2))
  }

}

export default Guest;