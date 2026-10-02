const express = require("express")
const router = express.Router()
const authenticationController = require("../controller/Authenticationcontroller")

router.post("/register", authenticationController.Register)
router.post("/login" , authenticationController.login)
router.post("/logout" , authenticationController.logout)

module.exports = router
