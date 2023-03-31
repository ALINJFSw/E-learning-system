const express = require("express");
const app = express();
app.use(express.json())
const mongoose = require("mongoose");
require('dotenv').config()
const userRoute = require("./router/auth.route");

app.use("/auth",userRoute);

app.listen(process.env.PORT,()=> {
    console.log("server is runnig now")
    require("./db.config")
})
