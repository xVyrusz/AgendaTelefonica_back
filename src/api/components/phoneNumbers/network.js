const express = require('express');
const router = express.Router();
const {
    addPhoneNumberSchema,
    listPhoneNumberSchema
} = require('../../../utils/validations/schemas/phoneNumber'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const controller = require('./controller');
const checkJwt = require('../../../utils/middlewares/auth/checkJwt');

router.get('/list', checkJwt, async (req, res, next) => {
    try {
        const userId = '64f90ff308f024115c36070e';
        // const userId = req.userData.id;

        const data = await controller.phoneNumberList(userId);

        res.status(200).json({
            Message: 'List',
            Response: data
        });
    } catch (error) {
        next(error);
    }
});

router.post(
    '/add',
    checkJwt,
    validationHandler(addPhoneNumberSchema),
    async (req, res, next) => {
        try {
            const userId = '64f90ff308f024115c36070e';
            // const userId = req.userData.id;
            const { name, phoneNumber, email, address, group } = req.body;
            const newPhoneNumber = {
                userId,
                name,
                phoneNumber,
                email,
                address,
                group
            };

            const data = await controller.phoneNumberCreation(newPhoneNumber);

            res.status(201).json({
                Message: 'Created',
                PhoneNumber: {
                    userId: data.userId,
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    address: data.address,
                    group: data.group
                }
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
