const userModel = require('../../../db/models/users');

const createUser = async (data) => {
    return await userModel.create({
        name: data.name,
        email: data.email,
        password: data.password
    });
};

const getUserByEmail = async (email) => {
    return await userModel.findOne({
        email: email
    });
};

const getUserById = async (_id) => {
    return await userModel.findById(_id);
};

module.exports = {
    userCreate: createUser,
    userByEmail: getUserByEmail,
    userById: getUserById
};
