import { expect } from 'chai';
import Guest from '../src/Guest';
import Hotel from '../src/Hotel';
import bookingsSampleData from './bookingsDataSample';
import roomsSampleData from './roomsDataSample';
import userSampleData from './userDataSample';

describe('Guest', function() {
  let currentGuest, date, hotel;
  
  beforeEach(() => {
    date = '2020/01/24';
    hotel = new Hotel(userSampleData, bookingsSampleData, roomsSampleData, date)
    currentGuest = new Guest(userSampleData[0].id, userSampleData[0].name)
  })
  
  it('should be a function', () => {
  expect(Guest).to.be.a('function');
  })

  it('should be an instance of Guest', () => {
  expect(currentGuest).to.be.an.instanceOf(Guest);
  })

  // it('should return an error message if there is no guest data', () => {
  // currentGuest = new Guest();
  // expect(currentGuest.guestData).to.equal('Error, guest data not found')
  // })

  it('should have a guest number id', function () {
    expect(currentGuest.id).to.be.a('number')
    expect(currentGuest.id).to.equal(1)
  })

  it('should have a name', function () {
    expect(currentGuest.name).to.be.a('string')
    expect(currentGuest.name).to.equal('Leatha Ullrich')
  })

  it('should return the guests first name', function () {
    expect(currentGuest.getGuestFirstName()).to.equal('Leatha')
  })

  it('should be able to find a guests bookings', function () {
    currentGuest.getGuestBookings(hotel)
    expect(currentGuest.guestBookings).to.deep.equal([
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

  it('should calculate the total amount guest has spent on rooms', () => {
    currentGuest.getGuestBookings(hotel)
    expect(currentGuest.getTotalCostOfRooms()).to.equal(787.84)
  })

}) 