'use strict'

const mocha = require('mocha');
const chai = require('chai');
const expect = require('chai').expect

const token = require('../tests/sample-data.js');
const cache = require('../persistance/cache.js');

describe('Cache', () => {
    
    before('Add a user', () => {
        cache.setUser('124558987917426', token.firstFakeToken);
    });
    
    it('Should get back a user and token', (done) => {
        cache.getUser('124558987917426').then((result) => {
            expect(result).to.not.be.null
            expect(result).to.equal(token.firstFakeToken);
            done();
        });
    });
});
