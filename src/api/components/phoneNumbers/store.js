const phoneNumberModel = require('../../../db/models/phoneNumbers');

const createPhoneNumber = async (data) => {
    return await phoneNumberModel.create({
        userId: data.userId,
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        group: data.group
    });
};

const deletePhoneNumber = async (data) => {
    return await phoneNumberModel.findByIdAndDelete(data);
};

const updatePhoneNumber = async (data, body) => {
    return await phoneNumberModel.findByIdAndUpdate(data, body, { new: true });
};

const getPhoneNumberById = async (_id) => {
    return await phoneNumberModel.findById(_id);
};

const getPhoneNumberByNumber = async (phoneNumber) => {
    return await phoneNumberModel.findOne({
        phoneNumber: phoneNumber
    });
};

const getPhoneNumberByUserId = async (userId) => {
    return await phoneNumberModel.find({
        userId: { $in: [userId] }
    });
};

module.exports = {
    createPhoneNumber,
    getPhoneNumberByNumber,
    getPhoneNumberByUserId,
    deletePhoneNumber,
    updatePhoneNumber,
    getPhoneNumberById
};
