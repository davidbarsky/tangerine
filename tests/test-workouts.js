"use strict"

const mocha = require("mocha")
    , chai = require("chai")
    , expect = require("chai").expect
    , chaiHTTP = require("chai-http")

const server = require("../app.js")

chai.use(chaiHTTP)

describe("Workouts Resources", () => {
  it("should not get a workout with no authentication", (done) => {
        chai.request(server)
            .get("workout/1")
            .end((err, res) => {
                expect(err).not.to.be.null
                done()
            })
    })
})
