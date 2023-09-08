const store = require('./store');
const boom = require('@hapi/boom');

const phoneNumberCreation = async (data) => {
    return await store.createPhoneNumber(data);
};

const phoneNumberList = async (userId) => {
    const objPhoneNumber = await store.getPhoneNumberByUserId(userId);

    if (objPhoneNumber.length === 0) {
        throw boom.conflict('Phone numbers not found');
    } else {
        return await objPhoneNumber;
    }
};

const phoneNumberById = async (_id) => {
    const objPhoneNumber = await store.getPhoneNumberById(_id);

    if (objPhoneNumber === null) {
        throw boom.conflict('Phone numbers not found');
    } else {
        return await objPhoneNumber;
    }
};

const phoneNumberDelete = async (data) => {
    const objPhoneNumber = await store.deletePhoneNumber(data);

    if (objPhoneNumber === null) {
        throw boom.conflict('Phone number not found');
    } else {
        return await objPhoneNumber;
    }
};

const phoneNumberUpdate = async (data, body) => {
    const objPhoneNumber = await store.getPhoneNumberById(data);
    if (objPhoneNumber === null) {
        throw boom.conflict('Phone number not found');
    } else {
        return await store.updatePhoneNumber(data, body);
    }
};

module.exports = {
    phoneNumberCreation,
    phoneNumberList,
    phoneNumberDelete,
    phoneNumberUpdate,
    phoneNumberById
};
