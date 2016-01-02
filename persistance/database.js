'use strict'

const PostgresSQL = require('pg-promise')()
const env = require('dotenv').load()
const auth = require('../lib/auth.js')

class Database {
	constructor() {
		this.db = PostgresSQL({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS
        })
	}

    authenticateUser(email, token) {
        let hashedToken = auth.hash_token(token)
        
        return this.db.one(`
            SELECT *
            FROM users AS A
            WHERE email=$1
            AND facebook_token=$2`
            , [email, hashedToken])
    }

    newUser(facebookID, token, name, email) {
        let hashedToken = auth.hash_token(token)
        
        return this.db.none(`
            INSERT INTO
            users(facebook_id, facebook_token, name, email)
            values($1, $2, $3, $4)`
            , [facebookID, hashedToken, name, email])
    }
    
    newWorkout(workout_id, user_id, data_completed) {
        return this.db.one(`
            INSERT INTO
            users(facebook)
        `)
    }

    getWorkout(workoutID) {
        return this.db.one('SELECT * FROM workouts WHERE workout_id = $1', workoutID)
    }

    getAllWorkouts(userID) {
        return this.db.query('SELECT * FROM workouts WHERE user_id = $1', userID)
    }
}

module.exports = Database
