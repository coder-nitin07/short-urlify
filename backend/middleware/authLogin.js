const joi = require('joi');

const authLogin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required()
});

const validateLogin = async (req, res, next)=>{
    const { error } = authLogin.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = validateLogin;