const express = require('express');
const router = express.Router();
const {
    createUserSchema,
    loginUserSchema
} = require('../../../utils/validations/schemas/user'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const controller = require('./controller');
const { createToken } = require('../../../utils/createJwt');
const jwt = require('jsonwebtoken');
const { config } = require('../../../config/index');
const boom = require('@hapi/boom');

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
                    _id: user._id,
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
                    _id: user._id,
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

router.get('/verify', async (req, res, next) => {
    try {
        let token = req.headers.cookie;
        let finalToken;
        if (token) {
            finalToken = token.split('=')[1];
        } else {
            throw boom.proxyAuthRequired('Bearer token is required 🐻');
        }

        if (!finalToken)
            return res.status(401).json({ Message: 'Unauthorized' });

        jwt.verify(finalToken, config.jwt_secret, async (err, user) => {
            if (err) return res.status(401).json({ Message: 'Unauthorized' });

            const data = await controller.userVerify(user);
            res.status(200).json({
                Message: 'Verified',
                Data: {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
            });
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
