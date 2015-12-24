"use strict"

const express = require("express")
    , Database = require("../persistance/database.js")

const router = express.Router()
const db = new Database()

router.get("/:id", (req, res, next) => {
	let result = db.getUser(req.params.id)

	result.then((data) => {
		res.json(data)
	}).catch(next)
})

router.post()

router.post("/new", (req, res, next) => {
    
})

module.exports = router