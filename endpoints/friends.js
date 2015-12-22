"use strict"

const express = require("express")
    , Database = require("../persistance/database.js")

const router = express.Router()
const db = new Database()

module.exports = router