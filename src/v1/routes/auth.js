const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const validation = require("../middleware/validation")
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
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
    async (req, res) => {
        console.log(req.body);
        try {
            req.body.password = CryptoJS.SHA256(req.body.password).toString();
            console.log(req.body)
            const user = User.create(req.body);
            const jwt_token = JWT.sign(
                    { id: user._id}, 
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "24h" }
                )
            return res.status(200).json({ 
                message: 'Registration successful!', 
                user,
                jwt_token
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
});

// user login

module.exports = router;
