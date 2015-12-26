'use strict'

// libraries
const express = require('express')
    , bodyparser = require('body-parser')
    , passport = require('passport')
    , BasicAuthStrategy = require('passport-http').BasicStrategy

// local files
const usersController = require('./controllers/users-controller.js')
    , workoutsController = require('./controllers/workouts-controller.js')
    , friendsController = require('./controllers/friends-controller.js')
    , loginController = require('./controllers/login-controller.js')

const Database = require('./persistance/database.js')

// initialiatoin
const app = express()
const db = new Database()

passport.use(new BasicAuthStrategy(
    (facebookID, facebookToken, callback) => {
        let result = db.authenticateUser(facebookID, facebookToken)

        result.then((user) => {
            return callback(user)
        }).catch((error) => {
            return callback(error)
        })
    }
))

app.use(bodyparser.json())

// routes
app.get('/', (req, res) => {
	res.json( {'message': 'you are home now!'} )
})

app.use('/login', loginController)
app.use('/user', passport.authenticate('basic'), usersController)
app.use('/workout', passport.authenticate('basic'), workoutsController)
app.use('/friend', passport.authenticate('basic'), friendsController)

// server startup
const server = app.listen(3000, () => {
	console.log('Tangerine is running.')
})

module.exports = server
