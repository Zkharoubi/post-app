const {register, Login} = require("../service/authentication.service")
const User = require("../models/user")

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
