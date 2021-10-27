const jwt = require("jsonwebtoken");

function checkJwt (req, res, next){
    try{
if(req.headers && req.headers.authorization){
    let nonDecodedToken = req.headers.authorization;
    let extractionOfToken = nonDecodedToken.slice(7);
    let decodedToken = jwt.verify(extractionOfToken, process.env.JWT_SECRET);
    res.locals.decodedData = decodedToken;
    next();
} else {
    throw{message: "You are not authorized. Please try again."}
}
    } catch(e){
        res.status(500).json({message: "Error", error: e.message});
    };
};

module.exports = {
    checkJwt,
}