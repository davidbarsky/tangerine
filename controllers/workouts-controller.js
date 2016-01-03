'use strict'

const express = require('express')
const db = require('../persistance/database.js')

const router = express.Router()

router.get('/:id', (req, res, next) => {
    let result = db.getWorkout(req.params.id)

    result.then((data) => {
        res.json(data)
    }).catch(next)
})

router.get('/', (req, res, next) => {
    let result = db.getAllWorkouts(res.params.id)

    result.then((data) => {
        res.json(data)
    }).catch(next)
})

router.post('/new', (req, res, next) => {
    let result = db.newWorkout(
        
    )
})

module.exports = router
