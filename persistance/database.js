'use strict'

const PostgresSQL = require('pg-promise')()
const env = require('dotenv').load()
const auth = require('../lib/auth.js')

const _db = PostgresSQL({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
})

exports.newUser = function newUser(facebookID, facebookToken, name, email) {
    let hashedFacebookToken = auth.hashToken(facebookToken)
    let uuid = auth.generateUUID()
    let bearerToken = auth.hashToken(uuid)
    
    return _db.none(`
        INSERT INTO
        users(facebook_id, facebook_token, bearer_token, name, email)
        values($1, $2, $3, $4, $5)`
        , [facebookID, hashedFacebookToken, bearerToken, name, email])
}

exports.newWorkout = function newWorkout(workout_id, user_id, data_completed) {
    
}

exports.getWorkout = function getWorkout(workoutID) {
    return _db.one('SELECT * FROM workouts WHERE workout_id = $1', workoutID)
}

exports.getAllWorkouts = function getAllWorkouts(userID) {
    return _db.query('SELECT * FROM workouts WHERE user_id = $1', userID)
}