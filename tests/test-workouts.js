'use strict'

const mocha = require('mocha')
const chai = require('chai')
const expect = require('chai').expect
const chaiHTTP = require('chai-http')

const server = require('../app.js')

chai.use(chaiHTTP)

describe('Workouts Resources', () => {
  it('should not get a workout with no authentication', (done) => {
        chai.request(server)
            .get('workout/1')
            .end((err, res) => {
                expect(err).not.to.be.null
                done()
            })
    })
})
