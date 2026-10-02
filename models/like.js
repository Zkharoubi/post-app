const mongoose = require("mongoose")
const Schema = mongoose.Schema

const likeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required: true
    },
    reactType:{type:String, default:'like'}

})

likeSchema.index({ userId:1, postId:1 }, { unique:true })

const Like = mongoose.model("Like", likeSchema)
module.exports = Like