const store = require('./store');
const boom = require('@hapi/boom');

const phoneNumberCreation = async (data) => {
    const objPhoneNumber = await store.phoneNumberByNumber(data.phoneNumber);

    if (objPhoneNumber !== null) {
        throw boom.conflict('Phone number already exist');
    } else {
        return await store.phoneNumberCreate(data);
    }
};

module.exports = {
    phoneNumberCreation
};
