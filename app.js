// imports
const Express = require("express")
const BodyParser = require("body-parser")
const Database = require("./database.js")

// initialization
const app = Express()
const db = new Database()

app.use(BodyParser.urlencoded({extended: true}))
app.use(BodyParser.json())

// routes
app.get("/", (req, res) => {
	res.json( {"message": "you're home now!"} )
})

app.get("/user/:id", (req, res, next) => {
	let result = db.getUser(req.params.id)
	
	result.then((data) => {
		res.json(data)
	}).catch(next)
})

// The error handling route. It should be called in each `.catch()` block.
app.use((err, req, res, next) => {
	console.log(err.stack)
	res.status(500).json( {"message": "Something broke. We're on it."} )
})

// server startup
const server = app.listen(3000, () => {
	let host = server.address().address
	let port = server.address().port

	console.log(`Example app listening on ${host, port}`)
})
