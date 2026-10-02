const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const postSchema = new Schema(
    {
        title: String,
        body: String,
        img: String,
        likes: { type:Number , default:0 },
        loves: { type:Number , default:0 },
        smiley: { type:Number , default:0 },
        views: { type:Number , default:0 },
        viewedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
       
        
    },
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;