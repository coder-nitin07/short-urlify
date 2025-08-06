const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("../models/authSchema");

// Register User
const createUser = async (req, res)=>{
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(404).json({ message: 'Please filled all the required fields' });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        });

        const token = jwt.sign(
            { id: newUser._id, name: newUser.name, email: newUser.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        const user = newUser.toObject();
        delete user.password;

        res.status(201).json({ message: 'User Register Successfully', user: user, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createUser };