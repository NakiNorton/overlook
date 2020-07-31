import { expect } from 'chai';
import Guest from '../src/Guest';
import bookingsSampleData from './bookingsDataSample';
import userSampleData from './userDataSample';

describe('Guest', function() {
  let currentGuest, bookings;
  
  beforeEach(() => {
    currentGuest = new Guest(userSampleData[0].id, userSampleData[0].name)
    bookings = bookingsSampleData;
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
    currentGuest.getGuestBookings(bookings)
    expect(currentGuest.bookings).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 1,
        "date": "2020/01/24",
        "roomNumber": 4,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 1,
        "roomServiceCharges": []
      }
    ])
  })

  // it('should calculate the total amount guest has spent on rooms', () => {
  //   currentGuest.getTotalCostOfRooms()
  // })

}) 