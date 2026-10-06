const express = require("express")
const router = express.Router()
const postController = require("../controllers/post-controller")
const auth = require("../middlewares/auth")

router.get("/", postController.fetchAllPosts)

router.post("/", auth, postController.createPost);
router.get("/viewMore", auth, postController.viewsInc)
router.get("/:postId", auth, postController.fetchPostById)
router.put("/:postId", auth, postController.editPost)
router.delete("/:postId", auth, postController.deletePost)

router.post("/like", auth, postController.addLike)

module.exports = router