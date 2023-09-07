const express = require('express');
const router = express.Router();
const {
    createUserSchema,
    loginUserSchema
} = require('../../../utils/validations/schemas/user'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const controller = require('./controller');
const { createToken } = require('../../../utils/createJwt');

router.get('/', async (req, res, next) => {
    try {
        res.status(200).json({
            Message: 'Hello!'
        });
    } catch (error) {
        next(error);
    }
});

router.post(
    '/register',
    validationHandler(createUserSchema),
    async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const newUser = {
                name,
                email,
                password
            };

            const user = await controller.userCreation(newUser);
            const token = await createToken(user);

            res.cookie('token', token);
            res.status(201).json({
                Message: 'Created',
                User: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/login',
    validationHandler(loginUserSchema),
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const loginUser = {
                email,
                password
            };

            const user = await controller.userLogin(loginUser);
            const token = await createToken(user);

            res.cookie('token', token);
            res.status(201).json({
                Message: 'Login',
                User: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/logout', async (req, res, next) => {
    try {
        res.cookie('token', '', {
            expires: new Date(0)
        });
        res.status(200).json({
            Message: 'Logout'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
