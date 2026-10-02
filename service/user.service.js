const User = require("../models/user")

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

module.exports = {register}