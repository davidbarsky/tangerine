"use strict"

// libraries
const express = require("express")
    , bodyparser = require("body-parser")
    , passport = require("passport")
    , BasicAuthStrategy = require('passport-http').BasicStrategy

// local files
const usersController = require("./controllers/users.js")
    , workoutsController = require("./controllers/workouts.js")
    , friendsController = require("./controllers/friends.js")

const Database = require("./persistance/database.js")

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
app.get("/", (req, res) => {
	res.json( {"message": "you're home now!"} )
})

app.use("/user", usersController)
app.use("/workout", passport.authenticate('basic'), workoutsController)
app.use("/friend", passport.authenticate('basic'), friendsController)

// server startup
const server = app.listen(3000, () => {
	console.log("Tangerine is running.")
})

module.exports = server