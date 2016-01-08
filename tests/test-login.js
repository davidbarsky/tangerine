'use strict'

const mocha = require('mocha')
const chai = require('chai')
const expect = require('chai').expect
const chaiHTTP = require('chai-http')

const token = require('../tests/sample-data.js')
const server = require('../app.js')
const cache = require('../persistance/cache.js')

chai.use(chaiHTTP)

describe('Users resource', () => {
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
    
    it('should cache the user’s credentials', (done) => {
        cache.getUser('124558987917426').then((result) => {
            expect(result).to.not.be.null
            done()
        })
    })
})
