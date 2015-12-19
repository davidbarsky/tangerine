// libraries
const Express = require("express")
const BodyParser = require("body-parser")

// initialization
const user = require("./controllers/users.js")
const app = Express()

app.use(BodyParser.urlencoded({extended: true}))
app.use(BodyParser.json())

// routes
app.get("/", (req, res) => {
	res.json( {"message": "you're home now!"} )
})

app.use("/user", user)

// server startup
const server = app.listen(3000, () => {
	let host = server.address().address
	let port = server.address().port

	console.log(`Example app listening on ${host, port}`)
})
