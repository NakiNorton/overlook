class Hotel {
  constructor(guests, bookings, rooms, date) {
  this.guests = guests;
  this.bookings = bookings;
  this.rooms = rooms;
  this.todaysDate = date;
  this.availableRooms = [];
  this.bookedRooms = [];
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

  findAvailableRooms(date = this.todaysDate) {
    let availRooms = this.bookings.filter(booking => booking.date !== date)
    this.rooms.filter(room => {
      availRooms.forEach(availRoom => {
        if (room.number === availRoom.roomNumber) {
          return this.availableRooms.push(room) 
        }
      })
    })
  }

  findBookedRooms(date = this.todaysDate) {
    let unavailRooms = this.bookings.filter(booking => booking.date === date)
    this.rooms.filter(room => {
      unavailRooms.forEach(bookedRoom => {
        if (room.number === bookedRoom.roomNumber) {
          return this.bookedRooms.push(room)
        }
      })
    })
  }

  calculateTodaysRevenue(date) {
    this.addRoomInfoToBookings()
    let todaysBookings = this.bookings.filter(booking => booking.date === date)
    let rev = todaysBookings.reduce((total, booking) => {
      return total + booking.costPerNight
    }, 0)
    console.log(rev)
    return rev;
  }


}

export default Hotel;



