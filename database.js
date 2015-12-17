const PostgresSQL = require('pg-promise')()
const connection = {
	host: 'localhost',
	port: 5432,
	database: 'ba_dev',
	user: 'David',
	password: ''
}

class Database {
	constructor() {
		this.db = PostgresSQL(connection)
		
		console.log("I've been made!")
	}

	getUser(id) {
		return this.db.one("select * from users where user_id = $1", id)
	}
}

module.exports = Database
