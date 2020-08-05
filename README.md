# Overlook Hotel

Overlook is a hotel management tool for hotel customers and staff to manage room bookings. This was the final solo project in Mod 2 at Turing School of Software and Design.

## Features
When logging in as a guest, the guest's name, bookings, and their total amount spent at the hotel are displayed. A guest can view all available rooms that meet their search criteria for date and room type, and make a new reservation.

When logging in as a manager, the total amount of rooms available, total revenue for today's date, and percentage of occupied rooms for today will be displayed. 
A manager can search for a guest by name and view all of the guests bookings.

## Set-Up
To install this app, clone the repository and enter the following into the terminal:
- `npm install` to start the server run
- `npm start` and navigate to http://localhost:8080/ in your browser. 

**Guest Login**  
Username: customer[1-50]   
Password: overlook2020  

**Manager Login**  
Username: manager  
Password: overlook2020   

## App in Action

![gif of manager logging in](./src/images/managerLogin.gif)</br>
*If a manager logs in the manager dashboard will be displayed*

![gif of manager searching for guest](src/images/manager-guest-search.gif)</br>
*A manager can search for guests by name*

![gif of the guest dashboard](src/images/guest-dash.gif)</br>
*If a guest logs in the guest dashboard will be displayed*

![gif of the room search display](./src/images/search-results.gif)</br>
*A guest can filter available rooms by date and room type*

## Technologies / Systems
- Javascript
- TDD with Mocha/Chai 
- Fetch API 
- Webpack 

## Wins
- 100% Lighthouse Audit for accessibility
- Successfully making post requests

## Next iterations
- In following iterations I would complete the manager functionality, enabling the manager to book/delete reservations for a guest.
- The UI has some holes in it; it needs more navigation buttons and should be made more responsive.
- Implement more robust sad path testing and testing with spies.

## Contributors
[Steph Norton](https://github.com/NakiNorton)

