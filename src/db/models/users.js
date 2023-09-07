const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = userModel;
