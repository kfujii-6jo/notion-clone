const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");


const hash_password =  (password) => {
    return CryptoJS.SHA256(password).toString();
}

exports.register = async (req, res) => {
    console.log(req.body);
    try {
        req.body.password = hash_password(req.body.password);
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
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if(!user) {
            return res.status(401).json({
                errors: {
                    param: "username",
                    message: "ユーザー名が無効です。"
                }
            })
        }

        if ( hash_password(password) !== user.password ){
            return res.status(401).json({
                errors: {
                    param : "password",
                    message: "パスワードが無効です"
                }
            })
        }
        const jwt_token = JWT.sign(
                { id: user._id}, 
                process.env.JWT_SECRET_KEY,
                { expiresIn: "24h" }
            )
        return res.status(201).json({
            message: "Login successful !",
            user,
            jwt_token
        });

    } catch (error) {
        return res.status(500).json(error);
    }
}