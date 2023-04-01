const HttpError = require("../support/http-error");
const jwt = require("jsonwebtoken")
exports.authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization?.token.splite(" ")[1];
    if(!token){
        const error = new HttpError("your are not authorized",405);
        return next(error);
    }
    try {
        const user = jwt.verify(token,process.env.SECRET);
        console.log(user);
    } catch (error) {
        
    }
}