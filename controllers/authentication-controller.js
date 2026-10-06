const User = require("../models/user")
const cookies = require("cookie-parser")
const { register, loginService } = require("../services/authentication-service")
const z = require("zod")
const AppError = require("../utils/app-error")

const userSchema = z.object({
    username: z.string({
        required_error: "username is required"
    }).min(5),
    password: z.string({
        required_error: "password is required"
    }).min(5),
})
/**
 * this is a function that add users to user table 
 * @param {*} req - express request contain `username` and `password` in req.body
 * @param {*} res -express response is used to send http status and json payload  
 * @returns json response with failure/success message and status code
 */
exports.register = async (req, res, next) => {
    try {

        const typedUsername = req.body.username
        const typedPassword = req.body.password
        const errormap = userSchema.safeParse({
            username: typedUsername,
            password: typedPassword
        })
        if (!errormap.success) {
            throw new AppError(400, errormap.error.flatten().fieldErrors)


        }

        const result = await register(typedUsername, typedPassword)
        //  console.log(`[${new Date().toISOString()}] user is registered info: ${result.registerResult.username}`)
        return res.json("you've been registered successfully")

    } catch (error) {

        next(error)

    }
}

/**
 * this is a function that check if user exist in a table
 * @param {*} req - express request contain `username` and `password` in `req.body`
 * @param {*} res - express response is used to send http status and json payload and to set cookie to the http response header
 * @returns json response with failure/success message and status code
 */

exports.login = async (req, res, next) => {
    try {
        const typedUsername = req.body.username
        const typedPassword = req.body.password

        const errormap = userSchema.safeParse({
            username: typedUsername,
            password: typedPassword
        })

        if (!errormap.success) {
            throw new AppError(400, errormap.error.flatten().fieldErrors)
        }

        const result = await loginService(typedUsername, typedPassword)
        // console.log(`[${new Date().toISOString()}] user is logged in info: ${result.loginResult.username}`)

        res.cookie('my_secure_token', result, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000
        })
        return res.json("you've been logged in succefully")

    } catch (error) {
        next(error)
    }
}
/**
 * a function that logout a user through clearing the cookie
 * @param {*} req 
 * @param {*} res express response is used to send http status and json payload and clear cookie from the http response header 
 * @returns 
 */
exports.logout = async (req, res, next) => {
    try {
        res.clearCookie(
            'my_secure_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        console.log(`Cookie 'my_secure_token' cleared via response header.`)
        return res.json("You've logged out successfully")
    } catch (error) {
        next(error)

    }

}



///process.env.JWT_SECRET