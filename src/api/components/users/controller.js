const bcrypt = require('bcryptjs');
const store = require('./store');
const boom = require('@hapi/boom');
const saltRounds = 10;

const userCreation = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const objEmail = await store.userByEmail(data.email);

    if (objEmail !== null) {
        throw boom.conflict('Email already exist');
    } else {
        data.password = hashedPassword;
        return await store.userCreate(data);
    }
};

module.exports = {
    userCreation
};
