'use strict'

const pg = require('pg-promise')()
const env = require('dotenv').load()

const _db = pg({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
})

exports.newUser = function(facebookID, facebookToken, bearerToken, name, email) {
    return _db.none(`
        INSERT INTO
        users(facebook_id, facebook_token, bearer_token, name, email)
        values($1, $2, $3, $4, $5)`
        , [facebookID, facebookID, bearerToken, name, email])
}

exports.newWorkout = function(workout_id, user_id, data_completed) {
    
}

exports.getWorkout = function(workoutID) {
    return _db.one('SELECT * FROM workouts WHERE workout_id = $1', workoutID)
}

exports.getAllWorkouts = function(userID) {
    return _db.query('SELECT * FROM workouts WHERE user_id = $1', userID)
}