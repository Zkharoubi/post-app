const jwt = require("jsonwebtoken")
/**
 * a middleware function that check if user is logged in
 * @param {*} req - express request contain `cookie from http headers and user information in rep.user
 * @param {*} res - express response is used to send http status and json payload  
 * @param {*} next - Calls the next route handler
 * @returns json response with failure/success message and status code
 */
function auth(req, res, next){
const token = req.cookies?.my_secure_token


if(!token){
    console.log(token)
        return res.status(401).json({ 
            success: false, 
            message: "Access denied. Please log in first." 
        });
    }
jwt.verify(token, "SECRET_KEY", (err, decodedPayLoad)=>{
    
    if(err){
        return res.status(403).json({
            success: false, 
            message: "Session expired or invalid. Please log in again." 
        })
    }

    req.user = decodedPayLoad
    
    next()
})
}

module.exports = auth