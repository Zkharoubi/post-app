const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const z = require("zod")
const userSchema = z.object({
    username : z.string({
        required_error:"title is required"
    }).min(5),
    password : z.string({
        required_error:"title is required"
    }).min(5),
})
/**
 * a function that validate fields, hash the password and create a user in the database 
 * @param {string} typedUsername a username from client  
 * @param {string} typedPassword a password from client 
 * @returns Result with code, message, and saved user object.
 */
async function register(typedUsername, typedPassword){
    const errormap =  userSchema.safeParse({
        username:typedUsername
        ,password:typedPassword
    })
if(!errormap.success){
    return {
        code: 400,
        message: errormap.error.flatten().fieldErrors,
       
    }
}
       const { username, password } = errormap.data;
        const user = await User.findOne({username:username})
        if(user){
           return {
                success:false,
                code:409,
                message: "username already exist"
            }
        }
    const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(typedPassword, salt)
            const NewUser = new User({
                username: typedUsername,
                password: hashedPassword
            })
           const registerResult = await NewUser.save()
           return {
                success:true,
                code:200,
                message: "you've successefully registered",
                registerResult: registerResult
            }
}

/**
 * a function that validate fields, hash and compare password then sign a token 
 * @param {string} typedUsername a username from client  
 * @param {string} typedPassword a password from client 
 * @returns Result with code, message, and saved user object.
 */
async function Login(typedUsername, typedPassword){
    const errormap =  userSchema.safeParse({
        username:typedUsername
        ,password:typedPassword
    })
if(!errormap.success){
    return {
        code: 400,
        message: errormap.error.flatten().fieldErrors,
       
    }
}
        const { username, password } = errormap.data;
        const user = await User.findOne({username : typedUsername})
        if(!user){
            return {
                code: 401 ,
                message: "invalid username or password"
            }
        }
      const passwordVerification = await bcrypt.compare(typedPassword, user.password )
        if(!passwordVerification){
             return {
                code: 401 ,
                message: "invalid username or password"
            }
        }
            const token = jwt.sign({userId: user._id}, "SECRET_KEY", { expiresIn :"2h"})
           
            return {
                code: 200,
                message:"you've logged in successufully ",
                token:token,
                loginResult: user
            }

}



module.exports = {register, Login}
 
