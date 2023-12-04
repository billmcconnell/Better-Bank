const express = require('express');
const app = express();
require('dotenv').config({ path: './env' })
const path = require('path');
const cors = require('cors');
const dal = require('./dal.js');

//CRUD
console.log("~~~~CRUD~~~~~~")
console.log(process.env.REACT_APP_MONGO_URI);
console.log("~~~~~~~~~~")

//additional info info
console.log("~~~~environment~~~~~~~~")
console.log(process.env.NODE_ENV);
console.log("~~~~dirname~~~~~~~~")
console.log(__dirname)
console.log("~~~~PORT~~~~~~~~")
console.log(process.env.REACT_APP_PORT);
console.log("~~~~~~~~~~~~")

app.use(cors());

// used to serve static files from public directory
// app.use(express.static('public'));


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
} else {
    app.get("/", (req, res) => {
        res.send("API running");
    });
}

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email)
        .then((users) => {

            // if user exists, return error message
            if (users.length > 0) {
                console.log('User already exists');
                res.send('User already exists');
            }
            else {
                // else create user
                dal.create(req.params.name, req.params.email, req.params.password)
                    .then((user) => {
                        console.log(user);
                        res.send(user);
                    });
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email)
        .then((user) => {

            // if user exists, check password
            if (user.length > 0) {
                if (user[0].password === req.params.password) {
                    res.send(user[0]);
                }
                else {
                    res.send('Login failed: wrong password');
                }
            }
            else {
                res.send('Login failed: user not found');
            }
        });

});

// deposit to a user account

app.get('/account/adjust/:email/:amount', function (req, res) {
    dal.adjust(req.params.email, req.params.amount)
        .then((balance) => {
            console.log('New Balance: ' + balance);
            res.send(balance);
        });
});

// get the balance for a user account

app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email)
        .then((balance) => {
            console.log('Balance: ' + balance);
            res.send(balance);
        });
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    const amount = Number(req.params.amount);

    dal.update(req.params.email, amount)
        .then((response) => {
            console.log(response);
            res.send(response);
        });
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

const PORT = process.env.REACT_APP_PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});