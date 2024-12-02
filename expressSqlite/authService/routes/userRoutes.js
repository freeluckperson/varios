const express = require("express");
const { getUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/api/users", getUsers);

module.exports = router;
