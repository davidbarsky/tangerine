"use strict"

const mocha = require("mocha")
    , chai = require("chai")
    , expect = require("chai").expect
    , chaiHTTP = require("chai-http")

const server = require("../app.js")

chai.use(chaiHTTP)

describe("User Resource", () => {
    it("should not have an index route", (done) => {
        chai.request(server)
            .get("/user")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(404)
                done()
            })
    })
    
    it("should get a specific user", (done) => {
        chai.request(server)
            .get("/user/1")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res).to.have.status(200)
                done()
            })
    })
})