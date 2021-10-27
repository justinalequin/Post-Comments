const {
    isAlpha,
    isAlphanumeric,
    isStrongPassword,
} = require("validator");

function validateUpdateData(req, res, next) {
    const { firstName, lastName, userName, password, confirmPassword } = req.body;

    let errObj = {};
    if (!isAlpha(firstName)) {
    errObj.firstName = "First name can only contain letters; A-Z";
    }

    if (!isAlpha(lastName)) {
    errObj.lastName = "Last name can only contain letters; A-Z";
    }

    if (!isAlphanumeric(userName)) {
    errObj.username = "Username can only be alpha-numeric; A-Z & 0-9";
    }

    if (!isStrongPassword(password)) {
    errObj.password =
        "Your password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character and be at least 8 characters long";
    }

    if (password !== confirmPassword) {
    errObj.confirmPassword = "Passwords must match. Pleast try again.";
    }

    if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
        message: "Error",
        error: errObj,
    });
    } else {
    next();
    }
}

module.exports = {
    validateUpdateData,
};
