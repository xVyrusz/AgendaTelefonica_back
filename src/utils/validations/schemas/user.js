const joi = require('joi');

const nameSchema = joi
    .string()
    .max(80)
    .regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/)
    .message(
        'That doesnt looks like a name, if you think its an error please contact with an administrator.'
    );
const emailSchema = joi
    .string()
    .max(80)
    .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
    .message('That doesnt looks like a valid email');
const passwordSchema = joi
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .message(
        'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
    );
// const phoneNumberSchema = joi
//     .string()
//     .min(8)
//     .regex(
//         /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
//     )
//     .message(
//         'That doesnt looks like a valid phone number, example: +523333333333'
//     );

const createUserSchema = {
    name: nameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required()
};

module.exports = {
    createUserSchema
};
