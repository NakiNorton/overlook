import { expect } from 'chai';
import Hotel from '../src/Hotel';
import bookingsSampleData from './bookingsDataSample';
import userSampleData from './userDataSample';
import roomsSampleData from './roomsDataSample';
import moment from 'moment';

describe('Hotel', function () {
  let hotel, date;

  beforeEach(() => {
    date  = moment().format('YYYY/MM/DD')
    hotel = new Hotel(userSampleData, bookingsSampleData, roomsSampleData, date)
  })

  it('should be a function', function() {
    expect(Hotel).to.be.a('function')
  })
  
  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel)
  })

  it('should have all the hotel guests', function() {
    expect(hotel.guests).to.deep.equal([
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

   it('should have all guest bookings', function() {
     expect(hotel.bookings).to.deep.equal(bookingsSampleData)
   })

   it('should have all rooms in hotel', function() {
     expect(hotel.rooms).to.deep.equal(roomsSampleData)
   })

   it('should have todays date', function() {
     expect(hotel.todaysDate).to.equal(date)
   })

   it('should add room info to booking', function () {
     hotel.addRoomInfoToBookings()
     expect(hotel.bookings[0]).to.deep.equal(
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 9,
        date: '2020/04/22',
        roomNumber: 8,
        roomServiceCharges: [],
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26
      })
    })

   it('should find all available rooms', function () {
     hotel.findAvailableRooms('2020/01/31')
     expect(hotel.availableRooms).to.deep.equal([
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
    hotel.findBookedRooms('2020/02/14')
    expect(hotel.bookedRooms).to.deep.equal([
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

  it('should calculate total revenue for today', function() {
    hotel.addRoomInfoToBookings()
    expect(hotel.calculateTodaysRevenue('2020/02/14')).to.equal(755.42)
  })

  it('should be able to find a guests bookings', function () {
    expect(hotel.findGuestBookings(1)).to.deep.equal([
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