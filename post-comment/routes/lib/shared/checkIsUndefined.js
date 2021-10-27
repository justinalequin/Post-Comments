function checkIsUndefined(req, res, next){
    let body = req.body;

    if (Object.keys(body).length === 0 || body === undefined){
        return res
        .status(500)
        .json({
            message: "Error",
            error: "Please ensure all fields are completed."
        });
    } else {
        next();
    }
};

module.exports = {
    checkIsUndefined,
}