const bcrypt = require('bcrypt')
const Promise = require('bluebird')
Promise.promisifyAll(bcrypt)

exports.hash_token = (token) => {
    return bcrypt.hashSync(token, 10)
}
