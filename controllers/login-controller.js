'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const Database = require('../persistance/database.js')

const router = express.Router()
const db = new Database()

router.post('/new', (req, res, next) => {
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

module.exports = router