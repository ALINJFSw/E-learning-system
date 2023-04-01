const express = require("express");
const app = express();
app.use(express.json())
const mongoose = require("mongoose");
require('dotenv').config()
const authRoute = require("./router/auth.route");
const userRoute = require("./router/user.route");
const adminRoute = require("./router/admin.route")
const HttpError = require("./support/http-error")
const {authMiddleware} = require("./middleware/authMiddleware");
const { adminMiddleware } = require("./middleware/adminMiddleware");
app.use("/auth",authRoute);
app.use("/users",authMiddleware,userRoute);
app.use("/admin",authMiddleware,adminMiddleware,adminRoute);

app.use((req, res, next) => {
    const error = new HttpError("can't find route",404);
    return next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.code || 400);
    res.send({ message: error.message || "sonthing went wrong !" });
  });

app.listen(process.env.PORT,()=> {
    console.log("server is runnig now")
    require("./db.config")
})
