const { register, Login } = require("./services/authentication-service")
const { create, getPost, getPostById, editPost, deletePost, AddLike, views } = require("./services/post-service")
const connection = require("./config/databaseConnection")

connection()
async function createUser() {


    console.log("Database connected!")
    const reg = await register("", "p")
    console.log(reg)

}

async function getUser() {

    try {
        const log = await Login("karem", "12345678")
        console.log(log)
    } catch (error) {
        console.log(error)
    }

}

async function creates() {
    try {
        const creat = await create("hello 7", "hello 7", null, "6abf591c4ed04a1f1b107136")
        console.log(creat)
    } catch (error) {
        console.log(error)
    }

}

async function Posts() {
    try {
        const Posts = await getPost()
        console.log(Posts)
    } catch (error) {
        console.log(error)
    }

}

async function PostById() {
    try {
        const PostById = await getPostById("6abf7b7fd9b06a831b57af1d")
        console.log(PostById)
    } catch (error) {
        console.log(error)
    }

}

async function edit() {
    try {
        const edit = await editPost("6ac2a36ec098308ec872e5e2", "helllllo", "hhh", null)
        console.log(edit)
    } catch (error) {
        console.log(error)
    }

}

async function deleteP() {
    try {
        const deleteP = await deletePost("6abf7b89d9b06a831b57af1e")
        console.log(deleteP)
    } catch (error) {
        console.log(error)
    }

}
createUser()

