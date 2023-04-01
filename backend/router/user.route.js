const express = require("express")
const router = express.Router()
const { testUser, addClass } = require("../controllers/user.controller");
const { adminMiddleware } = require("../middleware/adminMiddleware");
router.post("/test",testUser);
router.post("/addClass",addClass);


module.exports = router;