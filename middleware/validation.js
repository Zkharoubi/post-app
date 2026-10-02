// const {body, validationResult} = require("express-validator")
// const User = require("../models/user")

// const validationCharacter = [
//     body('title').notEmpty().isLength({min : 5}).withMessage("post's title must consist a min number of 5 character"),
//     body('body').notEmpty().isLength({max : 150}).withMessage("post's body can consist a max number of 150 character"),
   

//     (req, res, next)=>{
//         const errors = validationResult(req)
//         if(!errors.isEmpty()){
//             return res.status(400).json(({
//                 success: false,
//                 message: errors.array()[0].msg
//             }))
//         }
        
//         next();
//     }
// ]

// module.exports = {validationCharacter}