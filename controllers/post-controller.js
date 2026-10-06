const path = require("path");
const { create, getPost, getPostById, editPost, deletePost, AddLike, views } = require("../services/post-service")
const z = require("zod")
const AppError = require("../utils/app-error")

const userSchema = z.object({
    title: z.string({
        required_error: "title is required"
    }).min(5),
    body: z.string({
        required_error: "title is required"
    }).min(5),
})
/**
 * function that create a post in the post table
 * @param {*} req - express request contain `title`, `body` and `img` in req.body and `userId` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.createPost = async (req, res, next) => {

    try {
        const title = req.body.title
        const body = req.body.body
        const img = req.body.img
        const userID = req.user.userId

        const errormap = userSchema.safeParse({
            title, body
        })
        if (!errormap.success) {
            throw new AppError(400, errormap.error.flatten().fieldErrors)


        }

        // const uniqueImgName = Date.now() + "_"+ "userID_" + userID + "_" +PostImg.name
        // const savePath = path.join(__dirname ,'..', '/uploads/' , uniqueImgName)

        //     await PostImg.mv(savePath)

        const newPost = await create(req.log, title, body, null, userID)
        //    console.log(newPost)
        return res.json({ newPost })

    } catch (error) {
        // console.error("database failed to fetch posts", error.message) 

        next(error)

    }

}

/**
 * function that fetch all posts in the post table
 * @param {*} req 
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.fetchAllPosts = async (req, res, next) => {
    try {

        // throw new Error("Simulated Database Connection Drop!");
        const allPosts = await getPost(req.log)
        return res.json(allPosts)
    } catch (error) {
        //    console.error("database failed to fetch posts", error.message) 
        next(error)
    }

}

/**
 * function that fetch a specific post 
 * @param {*} req - express request contain `id` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.fetchPostById = async (req, res, next) => {
    try {
        const userID = req.user.userId
        const id = req.params.postId
        const post = await getPostById(id, req.log, userID)
        if (!post) {
            throw new Error("POST_NOT_FOUND")
        }
        return res.json(post)
    } catch (error) {
        next(error)
    }

}

/**
 * function that edit a specific post
 * @param {*} req - express request contain `id` in req.params and `title`, `body` and `img` in req.body
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.editPost = async (req, res, next) => {
    try {
        const id = req.params.postId
        const userId = req.user.userId
        const NewTitle = req.body.title
        const NewBody = req.body.body
        const NewImg = req.body.img
        const errormap = userSchema.safeParse({
            title: NewTitle,
            body: NewBody
        })
        if (!errormap.success) {
            throw new AppError(400, errormap.error.flatten().fieldErrors)


        }

        const post = await editPost(req.log, userId, id, NewTitle, NewBody, NewImg)
        if (!post) {
            throw new Error("POST_NOT_FOUND")
        }

        return res.json(post)
    } catch (error) {
        //  console.error("database failed to fetch posts", error.message) 
        next(error)
    }

}

/**
 * function that delete a specific post
 * @param {*} req - express request contain `id` in req.params 
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.deletePost = async (req, res, next) => {
    try {
        const id = req.params.postId
        const userId = req.user.userId
        const post = await deletePost(req.log, userId, id)
        if (!post) {
            throw new Error("POST_NOT_FOUND")
        }
        return res.json("Post successfully deleted")
    } catch (error) {
        console.error("error while trying to delete", error.message)
        next(error)
    }

}
/**
 * function add a dynamic react to a spesific post
 * @param {*} req - express request contain `postId` and `reactType` in req.body and `userId` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.addLike = async (req, res) => {
    const userId = req.user.userId
    const postId = req.body.postId
    const reactType = req.body.reactType
    const result = await AddLike(userId, postId, reactType)
    return res.json(result)
}
/**
 * function that increment views on a specific post 
 * @param {*} req - express request contain `postId` in req.body and `userId` in req.user
 * @param {*} res - express response is used to send http status and json payload  
 * @returns  json response with failure/success message and status code
 */
exports.viewsInc = async (req, res) => {
    const postId = req.body.postId
    const userId = req.user.userId
    const result = await views(postId, userId)
    return res.json("post viewed")
}

/** 
 * turn everything to service 
 * understand what img upload do 
 * validation: postTitle has 5 character, body has 150 character
 * add react to the post (dynamic)
 * log 
 */