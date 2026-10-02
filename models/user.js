const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username : 
    {   
        type: String,
        required: true,
        unique:true
    },
    password :
    {   
        type: String,
       
    }
}
    
)

const Login = mongoose.model("User", loginSchema)
module.exports = Login

