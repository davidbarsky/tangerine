'use strict'

const redis = require('ioredis')
const client = new redis(process.env.REDIS_URL)

exports.setUser = function(facebookID, bearerToken) {
    client.set(facebookID, bearerToken)
}

exports.getUser = function(facebookID) {
    return client.get(facebookID)
}