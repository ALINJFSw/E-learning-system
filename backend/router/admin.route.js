const express = require("express")
const { getUsers,addClass, getWithdrawalRequest } = require("../controllers/admin.controller")

const router = express.Router()

router.get("/get_users",getUsers)
router.get("/add-class",addClass)
router.get("/get-withdraw-requests",getWithdrawalRequest);

module.exports = router