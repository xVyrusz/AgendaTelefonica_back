const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneNumberSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        email: {
            type: String
        },
        address: {
            type: String
        },
        group: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const phoneNumberModel =
    mongoose.models.PhoneNumber ||
    mongoose.model('PhoneNumber', phoneNumberSchema);

module.exports = phoneNumberModel;
