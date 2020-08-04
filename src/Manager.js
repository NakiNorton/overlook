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

  findAvailableRooms(inputDate = this.todaysDate) {
    let todaysBookings = this.allBookings.filter(booking => booking.date === inputDate);
    let todaySortedBookings = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber);
    let todaysBookedRooms = todaySortedBookings.map(booking => booking.roomNumber);
    let availableRooms = [];
    this.allRooms.forEach(room => {
      if (!todaysBookedRooms.includes(room.number)) {
        availableRooms.push(room);
      }
    })
    this.availableRooms = availableRooms;
    return availableRooms;
  }

  findBookedRooms(inputDate = this.todaysDate) {
    let todaysBookings = this.allBookings.filter(booking => booking.date === inputDate);
    let bookedRooms = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)
    this.bookedRooms = bookedRooms;
    return bookedRooms;
  }

  getTotalRoomsAvailable() {
    this.findBookedRooms();
    return this.allRooms.length - this.bookedRooms.length;
  }

  getPercentageOfOccupiedRooms() {
    let roomsBookedToday = this.allBookings.filter(booking => booking.date === this.todaysDate).length;
    let percentage = ((roomsBookedToday / this.allRooms.length).toFixed(2) * 100);
    return percentage.toFixed();
  }

  calculateTodaysRevenue(date = this.todaysDate) {
    let todaysBookings = this.allBookings.filter(booking => booking.date === date);
    let totalRevenue = todaysBookings.reduce((total, booking) => {
      return total + booking.costPerNight;
    }, 0)
    return totalRevenue.toFixed(2);
  }

  findGuestBookings(id) {
    return this.allBookings.filter(booking => booking.userID === id)  ;
  }

  findGuestByName(nameInput) {
    let guestName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    let foundGuest = this.allGuests.find(guest => guest.name.includes(guestName))
    return foundGuest;
  }

  filterByRoomType(searchInput) {
    const roomsThatMeetCriteria = this.availableRooms.filter(room => room.roomType === searchInput);
    return roomsThatMeetCriteria;
  }
}

export default Manager;



