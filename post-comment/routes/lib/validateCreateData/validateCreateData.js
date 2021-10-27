const {
    isEmail,
    isStrongPassword,
    isAlphanumeric,
    isAlpha,
} = require("validator");

function validateCreateData (req,res,next){
    const {firstName, lastName, userName, email,password} = req.body;
    let errObj = {};

    if(!isAlpha(firstName)){
        errObj.firstName = "Please check first name; cannont have special characters";
    };

    if(!isAlpha(lastName)){
        errObj.lastName = "Please check last name; cannont have special characters";
    };

    if(!isAlphanumeric(userName)){
        errObj.firstName = "Please check username; cannont have special characters";
    };

    if(!isStrongPassword(password)){
        errObj.firstName = "Please enter a valid password!";
    };

    if(!isEmail(email)){
        errObj.firstName = "Please enter a valid email!";
    };

    if(Object.keys(errObj).legnth > 0){
        return res.status(500).json({
            message: "Error",
            error: errObj,
        });
    }else{
        next();
    }
};

module.exports = {
    validateCreateData,
};