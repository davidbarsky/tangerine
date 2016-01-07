'use strict'

const redis = require('ioredis')
const client = new redis(process.env.REDIS_URL)

exports.setUser = (facebookID, bearerToken) => {
    client.set(facebookID, bearerToken)
}

exports.getUser = (facebookID) => {
    return client.get(facebookID)
}