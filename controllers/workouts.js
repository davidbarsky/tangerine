"use strict"

const express = require("express")
    , Database = require("../persistance/database.js")

const router = express.Router()
const db = new Database()

router.get("/:id", (req, res, next) => {
    let result = db.getWorkout(req.params.id)
    
    result.then((data) => {
        res.json(data)
    }).catch(next)
})

router.get("/"), (req, res, next) => {
    let result = db.getAllWorkouts(res.params.id)
    
    result.then((data) => {
        res.json(data)
    }).catch(next)
}

module.exports = router