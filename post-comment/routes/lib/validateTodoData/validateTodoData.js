const {isAlpha} = require("validator");

function validateTodo (req, res, next){
    const {todo} = req.body;
    let errObj = {};

    if (!isAlpha(todo)){
        errObj.todo = "Letters from the alphabet only. A-Z"
    }

    if(Object.keys(errObj).length > 0){
        return res
        .status(500)
        .json({
            message: "error",
            error: errObj,
        });
    } else {
        next();
    }
}

module.exports = {
    validateTodo,
}