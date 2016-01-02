const bcrypt = require('bcrypt')
const Promise = require('bluebird')
const uuid = require('node-uuid')

Promise.promisifyAll(bcrypt)

exports.hashToken = (token) => {
    return bcrypt.hashSync(token, 10)

}

exports.generateUUID = () => {
    return uuid.v4()
}
