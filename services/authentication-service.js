const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

/**
 * a function that validate fields, hash the password and create a user in the database 
 * @param {string} typedUsername a username from client  
 * @param {string} typedPassword a password from client 
 * @returns Result with code, message, and saved user object.
 */
async function register(typedUsername, typedPassword) {
    const user = await User.findOne({ username: typedUsername })
    if (user) {
        throw new Error("USERNAME_EXISTS")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(typedPassword, salt)
    const NewUser = new User({
        username: typedUsername,
        password: hashedPassword
    })
    await NewUser.save()
}

/**
 * a function that validate fields, hash and compare password then sign a token 
 * @param {string} typedUsername a username from client  
 * @param {string} typedPassword a password from client 
 * @returns Result with code, message, and saved user object.
 */
async function loginService(typedUsername, typedPassword) {
    const user = await User.findOne({ username: typedUsername })
    if (!user) {
        throw new Error("INVALID_CREDENTIALS")
    }
    const passwordVerification = await bcrypt.compare(typedPassword, user.password)
    if (!passwordVerification) {
        throw new Error("INVALID_CREDENTIALS")
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" })
    return token

}



module.exports = { register, loginService }

