"use strict"

const PostgresSQL = require('pg-promise')()
const connection = {
    host: 'localhost'
  , port: 5432
  , database: 'ba_dev'
  , user: 'David'
  , password: ''
}

class Database {
	constructor() {
		this.db = PostgresSQL(connection)
	}
    
    authenticateUser(userID, hashedToken) {
        return this.db.one(
            `SELECT *
             FROM users AS A, hashed_tokens AS B
             WHERE A.user_id = B.user_id
             AND A.user_id = $1
             AND B.hashed_fb_token = $2`
             , userID
             , hashedToken)
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
