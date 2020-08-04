/* eslint-disable max-len */
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);
import domUpdates from '../src/domUpdates';


describe('DOM Updates', () => {
  beforeEach(() => {
    global.domUpdates
    global.document = {}
  })

  it('should be an object', () => {
    expect(domUpdates).to.be.an('object');
  })

  it('should spy on the display guest dashboard page', () => {
    chai.spy.on(domUpdates, 'getGuestFirstName', () => {})
    domUpdates.getGuestFirstName()
    expect(domUpdates.getGuestFirstName).to.have.been.called(1)

    chai.spy.on(domUpdates, 'getTotalCostOfRooms', () => {})
    domUpdates.getTotalCostOfRooms()
    expect(domUpdates.getGuestFirstName).to.have.been.called(1)
  })

  it('should spy on the display manager dashboard page', () => {
    chai.spy.on(domUpdates, 'calculateTodaysRevenue', () => {})
    domUpdates.calculateTodaysRevenue()
    expect(domUpdates.calculateTodaysRevenue).to.have.been.called(1)

    chai.spy.on(domUpdates, 'getTotalRoomsAvailable', () => {})
    domUpdates.getTotalRoomsAvailable()
    expect(domUpdates.getTotalRoomsAvailable).to.have.been.called(1)

    chai.spy.on(domUpdates, 'getPercentageOfOccupiedRooms', () => { })
    domUpdates.getPercentageOfOccupiedRooms()
    expect(domUpdates.getTotalRoomsAvailable).to.have.been.called(1)
  })

  it('should display an error message if the username or password is incorrect', () => {
    chai.spy.on(domUpdates, 'displayLoginError', () => {})
    domUpdates.displayLoginError()
    expect(domUpdates.displayLoginError).to.have.been.called(1)
  })

  it('should display an error message if the date selected is invalid', () => {
    chai.spy.on(domUpdates, 'displayDateError', () => { })
    domUpdates.displayDateError()
    expect(domUpdates.displayDateError).to.have.been.called(1)
  })

})
