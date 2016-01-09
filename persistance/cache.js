'use strict';

const Redis = require('ioredis');
const client = new Redis(process.env.REDIS_URL);


exports.setUser = (facebookID, bearerToken) => {
    client.set(facebookID, bearerToken);
};

exports.getUser = function(facebookID) {
    return client.get(facebookID);
};