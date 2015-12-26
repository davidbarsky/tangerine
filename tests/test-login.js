'use strict'

const mocha = require('mocha')
    , chai = require('chai')
    , expect = require('chai').expect
    , chaiHTTP = require('chai-http')

const token = require('./sample-data.js')
const server = require('../app.js')

chai.use(chaiHTTP)

describe('Users Resource', () => {
    
    it('should add a user', (done) => {
        chai.request(server)
            .post('/login/new')
            .send({
                'facebook_id': '124558987917426'
                , 'token': token.firstFakeUserToken
                , 'name': 'Test User'
                , 'email': 'open_brxtdpk_user@tfbnw.net'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
    })
})
