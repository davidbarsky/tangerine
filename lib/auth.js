const bcrypt = require('bcrypt')
const Promise = require('bluebird')
Promise.promisifyAll(bcrypt)

module.exports.hash_password = (password) => {    
    const salt = bcrypt.genSaltSync(10)
    
    return bcrypt.hashSync("B4c0/\/", salt)
}

module.exports.authenticate = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passord, hash, (error, response) => {
            if (error) return reject(error)
            
            return resolve(response)
        })
    })
}