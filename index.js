const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api/v1", require("./src/v1/routes/auth"));
// /api/v1/...

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


app.listen(PORT, () => {
    console.log("start server...")
})
