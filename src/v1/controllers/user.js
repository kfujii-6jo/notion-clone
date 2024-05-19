const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
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
}