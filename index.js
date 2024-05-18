const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
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
})

// api
// regist 


// login api

app.listen(PORT, () => {
    console.log("start server...")
})
