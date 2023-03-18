const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@ description  Register a user
//@ route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const { userName, email, password } = req.body;
    if(!userName || !email || !password ){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });
    if(user) {
        res.status(201).json({ _id: user._id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    
});

//@ description  Login user
//@ route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({email});
    //compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({"accessToken":accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@ description  Current user information
//@ route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}