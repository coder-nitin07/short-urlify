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


// Login User
const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: 'Invalid Credentails' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(404).json({ message: 'Invalid Credentails' });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        const getUser = user.toObject();
        delete getUser.password;

        res.status(200).json({ message: 'User Login Successfully', user: getUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createUser, loginUser };