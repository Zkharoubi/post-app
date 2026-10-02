const User = require("../models/user")
const cookies = require("cookie-parser")
const {register, Login} = require("../service/authentication.service")

/**
 * this is a function that add users to user table 
 * @param {*} req - express request contain `username` and `password` in req.body
 * @param {*} res -express response is used to send http status and json payload  
 * @returns json response with failure/success message and status code
 */
exports.Register =  async (req,res)=>{
    try {
       
            const typedUsername = req.body.username
            const typedPassword = req.body.password
            const result = await register(typedUsername, typedPassword)
            //  console.log(`[${new Date().toISOString()}] user is registered info: ${result.registerResult.username}`)
            return res.status(result.code).json(
                {
                message: result.message
            })

    } catch (error) {
      console.error("database failed to fetch credentials", error.message) 
      return res.status(500).json({
            success:false, 
            message: "failed to return credentials server side error"
        })
     
    }
}

/**
 * this is a function that check if user exist in a table
 * @param {*} req - express request contain `username` and `password` in `req.body`
 * @param {*} res - express response is used to send http status and json payload and to set cookie to the http response header
 * @returns json response with failure/success message and status code
 */

exports.login =  async (req,res)=>{
    try {
        const typedUsername =  req.body.username
        const typedPassword =  req.body.password
        const result = await Login(typedUsername, typedPassword)
        // console.log(`[${new Date().toISOString()}] user is logged in info: ${result.loginResult.username}`)
        
            res.cookie('my_secure_token', result.token, {
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000
            })
        return res.status(result.code).json({message: result.message})

    } catch (error) {
        console.error("database failed to fetch credentials", error.message) 
      return res.status(500).json({
            success:false, 
            message: "failed to return credentials server side error"
        })
     
    }
}
/**
 * a function that logout a user through clearing the cookie
 * @param {*} req 
 * @param {*} res express response is used to send http status and json payload and clear cookie from the http response header 
 * @returns 
 */
exports.logout = async(req, res)=>{
    try {
       res.clearCookie(
    'my_secure_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
})
        console.log(`Cookie 'my_secure_token' cleared via response header.`)
        return res.status(200).json({
            message: "You've logged out successfully"
        })
    } catch (error) {
        console.error("database failed to fetch credentials", error.message) 
      return res.status(500).json({
            success:false, 
            message: "failed to return credentials server side error"
        })
     
    }
    
}



///process.env.JWT_SECRET