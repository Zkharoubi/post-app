const {rateLimit} = require("express-rate-limit")
const express = require("express")
const router = express.Router()
const authenticationController = require("../controllers/authentication-controller")
const loginLimit = rateLimit({
    windowMs: 15 * 60* 1000,
    limit: 5,
    message: {message: "too many login attempts, please try again later"}
})
router.post("/register", authenticationController.register)
router.post("/login", loginLimit , authenticationController.login)
router.post("/logout", authenticationController.logout)

module.exports = router
