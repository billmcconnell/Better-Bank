# Better Bank
A full stack banking app using Node.js, React.js and Express, created as a Create React App (CRA).
## Instalation guide:

- clone the repo to local
- npm install

## How to run

- npm run dev will start both the server and client using concurrently

### Tech Stack

- Intalled using Create-React-App
- React.js for the front end
- Node.js with Express for routing
- MongoDB for the database
- Bootstrap for styling

## Features

- provides login, logout, deposit, withdraw, balance and an 'alldata' user overview page
- protects deposit, withdraw, balance and alldata links through login process
- provides authentication & authorization via the Google Firebase authorization service
- provides data storage via MongoDB Atlas nosql database service
- application routing provided by Express

## Future Improvements

- provide a running transaction list in addition to the 'alldata' list of users and balances
- protect the 'alldata' page using an administrator account to keep sensitive account data away from access by customer accounts
- support for thousands separators for larger sums
- a more modern login/signup/forgot password screen
- generally better UX using Bootstrap components

