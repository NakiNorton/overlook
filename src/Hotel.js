class Hotel {
  constructor(guests, bookings, rooms, date) {
  this.guests = guests;
  this.bookings = bookings;
  this.rooms = rooms;
  this.todaysDate = date;
  this.availableRooms = [];
  this.todaysRevenue = null;
}

  addRoomInfoToBookings() {
     return this.bookings.map(booking => {
       this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          booking.roomType = room.roomType,
          booking.bidet = room.bidet,
          booking.bedSize = room.bedSize,
          booking.numBeds = room.numBeds,
          booking.costPerNight = room.costPerNight
        }
      })
    })

  };

  getAvailableRooms(date = this.todaysDate) {
    let availRooms = this.bookings.filter(booking => booking.date !== date)
    
    this.rooms.filter(room => {
      availRooms.forEach(bookedRoom => {
        if (room.number === bookedRoom.roomNumber) {
          console.log(room)
          return this.availableRooms.push(room) 
        }
      })
    })
  }

  // calculateTodaysRevenue() {

  // }


}

export default Hotel;



