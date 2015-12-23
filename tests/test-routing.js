"use strict";

const mocha = require("mocha")
    , chai = require("chai")
    , expect = require("chai").expect
    , chaiHTTP = require("chai-http")

const server = require("../app.js")

chai.use(chaiHTTP)

describe("routing", () => {    
    it("should respond to the root request", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done();
            })
    })

    it("should get a user", (done) => {
        chai.request(server)
            .get("/user/1")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res).to.have.status(200)
                done()
            })
    })

    it("should not get a workout with no authentication", (done) => {
        chai.request(server)
            .get("workout/1")
            .end((err, res) => {
                expect(err).not.to.be.null
                done()
            })
    })

    // currently failing locally due to lack of stubbing. need to evaluate options
    it("should get a workout", (done) => {
        chai.request(server)
            .get("workout/1")
            .auth("1", "hello123")
            .end((err, res) => {
                expect(err).to.be.null        
                expect(res).to.have.status(200)
                expect(res).to.be.json
                done()
            })
    })  
})