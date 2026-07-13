const express = require("express");
const router = express.Router();
const { register, login, getMe, nextcrash } = require("../controllers/authController");
const protect = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getMe); // example protected route

module.exports = router;