import Guest from './Guest';

class Manager extends Guest {
  constructor(allGuests, allBookings, allRooms, date, id, name, guestBookings) {
    super(id, name, guestBookings)
    this.allGuests = allGuests;
    this.allBookings = allBookings;
    this.allRooms = allRooms;
    this.todaysDate = date;
    // this.availableRooms = [];
    // this.bookedRooms = [];
  }

  findAvailableRooms(inputDate) {
    let todaysBookings = this.allBookings.filter(booking => booking.date === inputDate)
    let todaySortedBookings = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)
    let todaysBookedRooms = todaySortedBookings.map(booking => booking.roomNumber)
    let availableRooms = [];
    this.allRooms.forEach(room => {
      if (!todaysBookedRooms.includes(room.number)) {
        availableRooms.push(room)
      }
    })
    console.log('avail rooms!:', availableRooms)
    return availableRooms
  }

  findBookedRooms(inputDate) {
    let todaysBookings = this.allBookings.filter(booking => booking.date === inputDate)
    // Is this sort needed?
    let bookedRooms = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)
    console.log('this booked!:', bookedRooms)
    return bookedRooms
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

  filterByRoomType(searchInput) {
  const roomsThatMeetCriteria = this.allRooms.filter(room => room.roomType === searchInput)
  return roomsThatMeetCriteria;
  }


}

export default Manager;



