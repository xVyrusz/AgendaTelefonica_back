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
    phoneNumberCreate: createPhoneNumber,
    phoneNumberByNumber: getPhoneNumberByNumber,
    phoneNumberByUserId: getPhoneNumberByUserId
};
