const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const validation = require("../middleware/validation");
const userController = require("../controllers/user");

require("dotenv").config();
// user regist 
router.post('/register', 
    body("username")
        .isLength({ min: 8 })
        .withMessage("ユーザー名は8文字以上である必要があります。"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("パスワードは8文字以上である必要があります。"),
    body("confirmPassword")
        .isLength({ min: 8 })
        .withMessage("確認用パスワードは8文字以上である必要があります。"),
    body("username").custom((value) => {
        return User.findOne({username: value}).then((user) => {
            if(user) {
                return Promise.reject("このユーザーはすでに使われています。")
            }
        });
    }),
    validation.validate,
    userController.register
);

// user login

module.exports = router;
