const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const User = require("./src/v1/models/user");
const app = express();
const PORT = 3000;
app.use(express.json());
require("dotenv").config();

try  {
    mongoose.connect(process.env.MONGODB_URL);
    console.log(process.env.MONGODB_URL)
    console.log('connecting to MongoDB...')
} catch (error) {
    console.log(error)
}

app.get('/', (req, res) => {
    res.send("Hello Express");
});

// user regist 
app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        req.body.password = CryptoJS.SHA256(req.body.password).toString();
        console.log(req.body)
        const user = User.create(req.body);
        return res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
        console.log(error);
    }
});

// user login

app.listen(PORT, () => {
    console.log("start server...")
})
