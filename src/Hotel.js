const hotel = {
  guests: null,
  bookings: null,
  rooms: null,
  todaysDate: null,
  
  defineHotelData(guests, bookings, rooms, date) {
    this.guests = guests;
    this.bookings = bookings;
    this.rooms = rooms;
    this.todaysDate = date;
    }
}

export default hotel;



