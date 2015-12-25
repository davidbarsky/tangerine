test:
	dropdb tangerine_test
	createdb tangerine_test
	psql tangerine_test < persistance/schema.sql
	NODE_ENV=test
	mocha --harmony tests

server:
	npm start
