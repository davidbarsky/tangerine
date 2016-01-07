'use strict'

const mocha = require('mocha')
const chai = require('chai')
const expect = require('chai').expect
const chaiHTTP = require('chai-http')

const token = require('../tests/sample-data.js')
const server = require('../app.js')

chai.use(chaiHTTP)

describe('Users Resource', () => {
    
    it('should add a user', (done) => {
        chai.request(server)
            .post('/login/new')
            .send({
                'facebookID': '124558987917426',
                'token': token.firstFakeToken,
                'name': 'Test User',
                'email': 'open_brxtdpk_user@tfbnw.net'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
    })
})
