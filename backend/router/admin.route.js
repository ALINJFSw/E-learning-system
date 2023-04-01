const express = require("express")
const { getUsers,addClass } = require("../controllers/admin.controller")
const router = express.Router()

router.get("/get_users",getUsers)
router.get("/add-class",addClass)

module.exports = router