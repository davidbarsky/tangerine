"use strict";

const mocha = require("mocha")
const chai = require("chai")
const chaiHTTP = require("chai-http")

const server = require("../app.js")
const should = chai.should()

chai.use(chaiHTTP)

it("should respond to the root request", (done) => {
    chai.request(server)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200)
            done();
        })
})

it("should get a user", (done) => {
    chai.request(server)
        .get("/user/1")
        .end((err, res) => {
            res.should.have.status(200)
            res.should.be.json
            done()
        })
})
