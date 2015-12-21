"use strict"

// libraries
const express = require("express")
const bodyparser = require("body-parser")
const passport = require("passport")
const BasicAuthStrategy = require('passport-http').BasicStrategy

// local files
const usersEndpoint = require("./endpoints/users.js")
const workoutsEndpoint = require("./endpoints/workouts.js")
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

// server startup
const server = app.listen(3000, () => {
	console.log("Tangerine is running.")
})

module.exports = server