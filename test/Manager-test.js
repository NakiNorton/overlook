import { expect } from 'chai';
import Manager from '../src/Manager';
import Guest from '../src/Guest';
import bookingsSampleData from './bookingsDataSample';
import userSampleData from './userDataSample';
import roomsSampleData from './roomsDataSample';
import moment from 'moment';

describe('Manager', function () {
  let manager, date;

  beforeEach(() => {
    date = moment().format('YYYY/MM/DD')

    const addRoomInfoToBooking = (bookings, rooms) => {
      return bookings.map(booking => {
        rooms.forEach(room => {
          if (room.number === booking.roomNumber) {
            booking.roomType = room.roomType,
            booking.bidet = room.bidet,
            booking.bedSize = room.bedSize,
            booking.numBeds = room.numBeds,
            booking.costPerNight = room.costPerNight
          }
        })
      })
    }
    addRoomInfoToBooking(bookingsSampleData, roomsSampleData)
    manager = new Manager(userSampleData, bookingsSampleData, roomsSampleData, date) 
  })

  it('should be a subclass of Guest', function () {
    expect(manager).to.be.an.instanceof(Guest)
  })

  it('should have a list of all hotel guests', function () {
    expect(manager.allGuests).to.deep.equal([
      { id: 1, name: 'Leatha Ullrich' },
      { id: 2, name: 'Rocio Schuster' },
      { id: 3, name: 'Kelvin Schiller' },
      { id: 4, name: 'Kennedi Emard' },
      { id: 5, name: 'Rhiannon Little' },
      { id: 6, name: 'Fleta Schuppe' },
      { id: 7, name: 'Dell Rath' },
      { id: 8, name: 'Era Hand' },
      { id: 9, name: 'Faustino Quitzon' },
      { id: 10, name: 'Tony Armstrong' }
    ])
  })

  it('should have all guest bookings', function () {
    expect(manager.allBookings).to.deep.equal(bookingsSampleData)
  })

  it('should have all hotel rooms manager', function () {
    expect(manager.allRooms).to.deep.equal(roomsSampleData)
  })

  it('should have todays date', function () {
    expect(manager.todaysDate).to.equal(date)
  })

  it('should find all available rooms', function () {
    manager.findAvailableRooms('2020/01/31')
    expect(manager.availableRooms).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02
      },
      {
        number: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46
      },
      {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26
      },
      {
        number: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39
      }
    ])
  })

  it('should return all booked rooms', function () {
    manager.findBookedRooms('2020/02/14')
    expect(manager.bookedRooms).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02
      },
    ])
  })

  it('should calculate total revenue for today', function () {
    expect(manager.calculateTodaysRevenue('2020/02/14')).to.equal(755.42)
  })

  it('should be able to find a guests bookings', function () {
    expect(manager.findGuestBookings(1)).to.deep.equal([
      {
        id: '5fwrgu4i7k55hl6t5',
        userID: 1,
        date: '2020/01/24',
        roomNumber: 4,
        roomServiceCharges: [],
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44
      },
      {
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2020/02/14',
        roomNumber: 1,
        roomServiceCharges: [],
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      }
    ])
  })
})