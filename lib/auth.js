const bcrypt = require('bcrypt')
const Promise = require('bluebird')
Promise.promisifyAll(bcrypt)

exports.hash_token = (token) => {
    return bcrypt.hashSync(token, 10)
}

exports.authenticate = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passord, hash, (error, response) => {
            if (error) return reject(error)
            
            return resolve(response)
        })
    })
}