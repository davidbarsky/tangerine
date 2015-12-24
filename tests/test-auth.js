"use strict"

const mocha = require("mocha")
    , chai = require("chai")
    , expect = require("chai").expect
    , chaiHTTP = require("chai-http")

const server = require("../app.js")

chai.use(chaiHTTP)

describe("Root", () => {
    it("should not be authenticated", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
    })

    it("should ignore authentication credentials", (done) => {
        chai.request(server)
            .get("/")
            .auth("1", "hello123")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
    })
})