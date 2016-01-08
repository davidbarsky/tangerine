'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const db = require('../persistance/database.js')
const cache = require('../persistance/cache.js')
const auth = require('../lib/auth.js')
const router = express.Router()

router.post('/new', (req, res, next) => {
    let hashedToken = auth.hashToken(req.body.token)
    let uuid = auth.generateUUID()
    let bearerToken = auth.hashToken(uuid)
    
    cache.setUser(req.body.facebookID, bearerToken)   
    let result = db.newUser(
        req.body.facebookID,
        hashedToken,
        bearerToken,
        req.body.name,
        req.body.email
    )

    result.then((data) => {
        res.send(bearerToken)
    }).catch(next)
})

module.exports = router