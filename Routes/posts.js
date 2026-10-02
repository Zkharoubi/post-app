const express = require("express")
const router = express.Router()
const postController = require("../controller/PostController")
const auth = require("../middleware/auth")
const {validationCharacter} = require("../middleware/validation")

router.get("/posts", postController.fetchAllPosts)

router.post("/posts", auth  , postController.createPost);
router.get("/posts/:postId", auth , postController.fetchPostById)
router.put("/posts/:postId", auth , postController.editPost)
router.delete("/posts/:postId", auth , postController.deletePost)

router.post("/posts/like/", auth, postController.addLike)
router.get("/post/viewMore/", auth, postController.viewsInc)

module.exports = router