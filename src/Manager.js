import Guest from './Guest';

class Manager extends Guest {
  constructor(allGuests, allBookings, allRooms, date, id, name, guestBookings) {
    super(id, name, guestBookings)
    this.allGuests = allGuests;
    this.allBookings = allBookings;
    this.allRooms = allRooms;
    this.todaysDate = date;
    this.availableRooms = [];
    this.bookedRooms = [];
  }

  findAvailableRooms(date = this.todaysDate) {
    let availRooms = this.allBookings.filter(booking => booking.date !== date)
    this.allRooms.filter(room => {
      availRooms.forEach(availRoom => {
        if (room.number === availRoom.roomNumber) {
          return this.availableRooms.push(room) 
        }
      })
    })
  }

  findBookedRooms(date = this.todaysDate) {
    let unavailRooms = this.allBookings.filter(booking => booking.date === date)
    this.allRooms.filter(room => {
      unavailRooms.forEach(bookedRoom => {
        if (room.number === bookedRoom.roomNumber) {
          return this.bookedRooms.push(room)
        }
      })
    })
  }

  calculateTodaysRevenue(date) {
    let todaysBookings = this.allBookings.filter(booking => booking.date === date)
    return todaysBookings.reduce((total, booking) => {
      return total + booking.costPerNight
    }, 0)
  }

  findGuestBookings(id) {
    return this.allBookings.filter(booking => booking.userID === id)
    
  }
}

export default Manager;



