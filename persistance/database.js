"use strict"

const PostgresSQL = require("pg-promise")()
const bcrypt = require("bcrypt")
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
        return this.db.one(`
            SELECT *
            FROM users AS A
            WHERE user_id = $1 AND
            AND hashed_token = $2`
            , [userID, hashedToken])
    }
    
    newUser(facebook_id, token, name, email) {
        return this.db.none(`
            insert into
            users(facebook_id, hashed_token, name, email)
            values($1, $2, $3, $4)`
            , [facebook_id, token, name, email])
    }

	selectUser(userID) {
		return this.db.one("SELECT * FROM users WHERE user_id = $1", userID)
	}
    
    deleteUser(userID) {
        return this.db.result("DELETE FROM users WHERE user_id = $1", userID)
    }
   
    getWorkout(workoutID) {
        return this.db.one("select * FROM workouts WHERE workout_id = $1", workoutID)
    }
    
    getAllWorkouts(userID) {
        return this.db.query("SELECT * FROM workouts WHERE user_id = $1", userID)
    }
}

module.exports = Database
