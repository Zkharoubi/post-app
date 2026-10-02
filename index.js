const express = require("express")
const app = express()
const connection = require("./config/databaseConnection")
const cookies = require("cookie-parser")
const fileUpload = require("express-fileupload")
const path = require("path");
const authRoutes = require("./Routes/auth")
const postsRoutes = require("./Routes/posts")
app.use(express.json())
app.use(cookies());
app.use(fileUpload())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use('/', authRoutes)
app.use('/', postsRoutes)




connection()

app.listen(3000, ()=>{

})

//====get posts for api====//
// app.get("/allposts", async (req, res)=>{
//     const allPosts = await Post.find()
//  return   res.render("allPosts.ejs", {
//         allPosts: allPosts
//     })
// })


