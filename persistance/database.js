"use strict"

const PostgresSQL = require("pg-promise")()
const env = require("dotenv").load()

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
    
    authenticateUser(userID, hashedToken) {
        return this.db.one(
            `SELECT *
             FROM users AS A, hashed_tokens AS B
             WHERE A.user_id = B.user_id
             AND A.user_id = $1
             AND B.hashed_fb_token = $2`
             , [userID, hashedToken])
    }

	getUser(userID) {
		return this.db.one("select * from users where user_id = $1", userID)
	}
   
    getWorkout(workoutID) {
        return this.db.one("select * from workouts where workout_id = $1", workoutID)
    }
    
    getAllWorkouts(userID) {
        return this.db.query("select * from workouts where user_id = $1", userID)
    }
}

module.exports = Database
