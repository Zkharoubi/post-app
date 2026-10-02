const Post = require("../models/post")
const Like = require("../models/like")
const z = require("zod")

const userSchema = z.object({
    title : z.string({
        required_error:"title is required"
    }).min(5),
    body : z.string({
        required_error:"title is required"
    }).min(5),
})
/**
 * a function that validate fields create a post in database
 * @param {*} title a title from client  
 * @param {*} body a body from client  
 * @param {*} img a img from client  
 * @param {*} userId a userID from req.user  
 * @returns return code, messages and save post object 
 */
async function create(title, body, img, userId){
 console.log(`'attempting to create a new post by userId: ${userId}.`)


   const errormap =  userSchema.safeParse({
        title,body
    })
if(!errormap.success){
    return {
        code: 400,
        message: errormap.error.flatten().fieldErrors,
       
    }
}
    const newPost = new Post()
    newPost.title = title
    newPost.body = body
    newPost.img = img
    newPost.userId = userId
    const result = await newPost.save()
   
    
     return {
        code: 200,
        message: result
       
    }
}

/**
 * a function that fetch all posts from database
 * @returns return posts object from database 
 */
async function getPost(){
    return await Post.find()
}
/**
 * a function that fetch a specific post from database
 * @returns return post object from database 
 */
async function getPostById(id){
   return await Post.findById(id)
}
/**
 * a function that edit a specific post 
 * @param {*} id  an id from client
 * @param {*} NewTitle  a title from client
 * @param {*} NewBody  a body from client
 * @param {*} NewImg  an img from client
 * @returns an updated object of the post
 */
async function editPost(id, NewTitle, NewBody, NewImg){
   return await Post.findByIdAndUpdate(id, 
    {title: NewTitle, body: NewBody, img: NewImg},
    { returnDocument: 'after' }
)
}
/**
 * a function that delete a specific post 
 * @param {*} id an id from client
 * @returns 
 */
async function deletePost(id){
   return await Post.findByIdAndDelete(id)
}
/**
 * a function that add a dynamic react to a specific post 
 * @param {*} userId a userId from req.user
 * @param {*} postId a postId from client
 * @param {*} reactType a reactType from client
 * @returns message whether a react is successfuly done or not
 */
async function AddLike(userId, postId, reactType){
         const existingReact = await Like.findOneAndDelete({ userId, postId, reactType });
       
     if(!existingReact){
        await Like.findOneAndUpdate({ userId, postId}, { reactType },{ upsert: true })

     }
     const loveCount = await Like.countDocuments({postId, reactType:"love"})
     const likeCount = await Like.countDocuments({postId, reactType:"like"})
     const smileyCount = await Like.countDocuments({postId, reactType:"smiley"})
     await Post.findByIdAndUpdate(postId, { loves : loveCount , likes : likeCount, smiley : smileyCount })
     return {
        message: existingReact ? "unliked successfuly" : "reacted successfuly"
     }
        
    }
/**
 * a function that increment views number for a specific post
 * @param {*} postId a postId from client
 * @param {*} userId a userId from req.user
 * @returns status and message about post views 
 */
async function views(postId, userId){
    if(userId){
        await Post.updateOne(
        { _id:postId, viewedBy: {$ne: userId}},
       {$inc:{views:1},
        $addToSet:{viewedBy: userId}
    })
   
    }else{
        await Post.findByIdAndUpdate(postId, {$inc: { views:1} })
    }
    return {viewed:true, message:"post viewed"}
    
}




module.exports = {create, getPost, getPostById, editPost, deletePost, AddLike , views}