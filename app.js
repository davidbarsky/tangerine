"use strict"

// libraries
const express = require("express")
    , bodyparser = require("body-parser")
    , passport = require("passport")
    , BasicAuthStrategy = require('passport-http').BasicStrategy

// local files
const usersEndpoint = require("./endpoints/users.js")
    , workoutsEndpoint = require("./endpoints/workouts.js")
    , friendsEndpoint = require("./endpoints/friends.js")

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

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

// routes
app.get("/", (req, res) => {
	res.json( {"message": "you're home now!"} )
})

app.use("/user", usersEndpoint)
app.use("/workout", passport.authenticate('basic'), workoutsEndpoint)
app.use("/friend", passport.authenticate('basic'), friendsEndpoint)

// server startup
const server = app.listen(3000, () => {
	console.log("Tangerine is running.")
})

module.exports = server