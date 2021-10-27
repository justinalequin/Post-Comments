const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const errorHandler = require('../../utils/errorHandler/errorHandler');

async function userSignUp (req, res){
    const {firstName, lastName, userName, email, password} = req.body;

    try{
        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password,salt);

        const createdUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashed,
        });

        let savedUser = await createdUser.save();
        res.json({message: "success", payload: savedUser});
    }catch(e){
        res
        .status(500)
        .json({
            message: "Error",
            error: errorHandler(e),
        })
    }
};

async function userLogin (req, res){
    const {email, password} = req.body;

    try{
        let foundUser = await User.findOne({email: email});
        if(!foundUser){
            res.status(500).json({
                message: "error",
                error: "No user found. Please sign up.",
            });
        }else{
            let checkPassword = await bcrypt.compare(password, foundUser.password);
            if(!checkPassword){
                res.status(500).json({
                    message: "Error",
                    error: "Check the email and password you provided.",
                });
            }else{
                let jwtToken = jwt.sign({
                    email: foundUser.email,
                    userName: foundUser.userName,
                },
                process.env.JWT_SECRET,
                {expiresIn: "24h"}
                )
                res.json({message: "success", payload: jwtToken});
            }
        }
    }catch(e){
        res
        .status(500)
        .json({message: "Error", error: errorHandler(e)});
    }
};

async function userUpdate (req, res){
    try{
        const {password} = req.body;
        const decodedData = res.locals.decodedData;

        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);
        req.body.password = hashed;
        let updateUser = await User.findOneAndUpdate(
            {email: decodedData.email},
            req.body,
            {new:true}
        );
        res.json({
            message: "Success",
            payload: updateUser,
        });
    }catch(e){
        res.status(500).json({
            message: "Error",
            error: errorHandler(e),
        })
    }
};

module.exports = {
    userSignUp,
    userLogin,
    userUpdate,
};

