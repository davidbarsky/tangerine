"use strict"

const mocha = require("mocha")
    , chai = require("chai")
    , expect = require("chai").expect
    , chaiHTTP = require("chai-http")

const token = require("./test-data.js")
const server = require("../app.js")
const usersController = require("../controllers/users.js")

chai.use(chaiHTTP)

describe("Users Resource", () => { 
    it("should add a user", (done) => {
        chai.request(server)
            .post("/user/new")
            .send({
                "facebook_id": "124558987917426"
                , "token": token.firstFakeUserToken
                , "name": "Test User"
                , "email": "open_brxtdpk_user@tfbnw.net"
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
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
    
    it("should remove the user from the database", (done) => {
        chai.request(server)
            .post("/user/delete/2")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res).to.have.status(200)
                done()
            })
    })
    
    it("should not have an index route", (done) => {
        chai.request(server)
            .get("/user/")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(404)
                done()
            })
    })
})