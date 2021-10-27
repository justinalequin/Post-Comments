const express = require('express');
const router = express.Router();


const {
    userSignUp,
    userLogin,
    userUpdate
} = require('./controller/userController');


const {
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData,
    checkJwt,
} = require('../lib/auth');

router.post("/create-user",
    validateCreateData,
    checkIsEmpty,
    checkIsUndefined,
    userSignUp,
);

router.put("/login",
    validateLoginData,
    checkIsEmpty,
    checkIsUndefined,
    userLogin,
);

router.put("/update",
    checkJwt,
    checkIsEmpty,
    checkIsUndefined,
    validateUpdateData,
    userUpdate
);

module.exports = router;