"use strict";

const express = require("express")
    , bodyParser = require("body-parser")
    , Database = require("../persistance/database.js")

const router = express.Router()
const db = new Database()

router.get("/:id", (req, res, next) => {
	let result = db.selectUser(req.params.id)

	result.then((data) => {
		res.json(data)
	}).catch(next)
})

router.post("/new", (req, res, next) => {
    let result = db.newUser(
        req.body.facebook_id
        , req.body.token
        , req.body.name
        , req.body.email
    )

    result.then((data) => {
        res.send(data)
    }).catch(next)
})

router.post("/delete/:id", (req, res, next) => {
    let result = db.deleteUser(req.params.id)

    result.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router
