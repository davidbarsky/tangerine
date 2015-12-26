'use strict';

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Database = require('../persistance/database.js')

const router = express.Router()
const db = new Database()

module.exports = router
