const Express = require("express")
const Database = require("../database.js")

const router = Express.Router()
const db = new Database()

router.get("/:id", (req, res, next) => {
	let result = db.getUser(req.params.id)

	result.then((data) => {
		res.json(data)
	}).catch(next)
})

module.exports = router