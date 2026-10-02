const path = require("path");
const {create, getPost, getPostById, editPost, deletePost, AddLike, views} = require("../service/post.service")

/**
 * function that create a post in the post table
 * @param {*} req - express request contain `title`, `body` and `img` in req.body and `userId` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.createPost =  async (req, res)=>{
   
    try {
       const title = req.body.title
       const body = req.body.body
       const img = req.body.img
       const userID = req.user.userId
       
        

    // const uniqueImgName = Date.now() + "_"+ "userID_" + userID + "_" +PostImg.name
    // const savePath = path.join(__dirname ,'..', '/uploads/' , uniqueImgName)

    //     await PostImg.mv(savePath)
        
       const newPost = await create(title, body, null, userID)
       return res.status(newPost.code).json(newPost.message)

    } catch (error) {
        console.error("database failed to fetch posts", error.message) 
      return res.status(500).json({
            success:false, 
            message: "failed to return posts server side error"
        })
     
    }

}

/**
 * function that fetch all posts in the post table
 * @param {*} req 
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.fetchAllPosts =  async (req, res)=>{
    try {
    // throw new Error("Simulated Database Connection Drop!");
    const allPosts = await getPost()
    return res.status(200).json(allPosts)
    } catch (error) {
       console.error("database failed to fetch posts", error.message) 
      return res.status(500).json({
        success:false,
        message: "failed to return posts server side error"
       })
    }
   
}

/**
 * function that fetch a specific post 
 * @param {*} req - express request contain `id` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.fetchPostById =   async (req, res)=>{
    try {
        const id = req.params.postId
        const post = await getPostById(id)
        if(!post){
        return res.status(404).json({
            success: false,
            message: "couldn't find this post"
        })
        }
        return res.status(200).json(post)
    } catch (error) {
        console.error("database failed to fetch posts", error.message) 
       return res.status(500).json({
        success:false,
        message: "failed to return posts server side error"
       })
    }

}

/**
 * function that edit a specific post
 * @param {*} req - express request contain `id` in req.params and `title`, `body` and `img` in req.body
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.editPost = async (req, res)=>{
    try {
       const id = req.params.postId
       const NewTitle = req.body.title
       const NewBody = req.body.body
       const NewImg = req.body.img
       
       const post = await editPost(id, NewTitle, NewBody, NewImg)
        if(!post){
            return res.status(404).json({
                success:false,
                message:"this post doesn't exist"
            })
        }
        
        return res.status(200).json(post) 
    } catch (error) {
         console.error("database failed to fetch posts", error.message) 
       return res.status(500).json({
        success:false,
        message: "failed to return posts server side error"
       })
    }

}

/**
 * function that delete a specific post
 * @param {*} req - express request contain `id` in req.params 
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.deletePost =  async (req, res)=>{
    try {
       const id = req.params.postId  
       const post = await deletePost(id)
        if(!post){
            return res.status(404).json({
                success:false,
                message:"delete failed: this post doesn't exist"
            })
        }
        return res.status(200).json({
                success:true,
                message:"Post successfully deleted"
            }) 
    } catch (error) {
         console.error("error while trying to delete", error.message) 
      return res.status(500).json({
        success:false,
        message: "failed to delete post server side error"
       })
    }

}
/**
 * function add a dynamic react to a spesific post
 * @param {*} req - express request contain `postId` and `reactType` in req.body and `userId` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.addLike = async(req, res)=>{
    const userId = req.user.userId
    const postId = req.body.postId
    const reactType = req.body.reactType
    const result = await AddLike(userId, postId, reactType)
    return res.status(200).json(result)
}
/**
 * function that increment views on a specific post 
 * @param {*} req - express request contain `postId` in req.body and `userId` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.viewsInc = async(req, res)=>{
    const postId = req.body.postId
    const userId = req.user.userId
    const result = await views(postId , userId)
    return res.status(200).json(result)
}

/** 
 * turn everything to service 
 * understand what img upload do 
 * validation: postTitle has 5 character, body has 150 character
 * add react to the post (dynamic)
 * log 
 */