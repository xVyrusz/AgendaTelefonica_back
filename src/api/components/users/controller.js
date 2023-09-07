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

const userLogin = async (user) => {
    const data = await store.userByEmail(user.email);
    if (!data) throw boom.badData('Email or password are invalid');

    const passwordMatched = await bcrypt.compare(user.password, data.password);

    if (!passwordMatched) throw boom.badData('Email or password are invalid');

    return {
        id: data._id,
        name: data.name,
        email: data.email
    };
};

module.exports = {
    userCreation,
    userLogin
};
