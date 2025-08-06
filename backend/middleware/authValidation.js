const joi = require('joi');

const authSchema = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base':
                'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        })
});

const authValidation = async (req, res, next)=>{
    const { error } = authSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = authValidation;