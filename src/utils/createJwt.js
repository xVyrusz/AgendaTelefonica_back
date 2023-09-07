const { config } = require('../config/index');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email
    }, config.jwt_secret, {
        expiresIn: '1d'
    })

    return token;
}

module.exports = {
    createToken
}