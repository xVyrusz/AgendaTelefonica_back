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

const phoneNumberList = async (userId) => {
    const objPhoneNumber = await store.phoneNumberByUserId(userId);

    if (objPhoneNumber.length === 0) {
        throw boom.conflict('Phone numbers not found');
    } else {
        return await objPhoneNumber;
    }
};

module.exports = {
    phoneNumberCreation,
    phoneNumberList
};
