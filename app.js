"use strict"

// libraries
const express = require("express")
const bodyParser = require("body-parser")

// initialization
const usersEndpoint = require("./endpoints/users.js")
const workoutsEndpoint = require("./endpoints/workouts.js")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// routes
app.get("/", (req, res) => {
	res.json( {"message": "you're home now!"} )
})

app.use("/user", usersEndpoint)
app.use("/workout", workoutsEndpoint)

// server startup
const server = app.listen(3000, () => {
	console.log("Tangerine is running.")
})

module.exports = server