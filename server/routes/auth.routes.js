const express = require("express");
const { registerParent, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register-parent", registerParent);
router.post("/login", login);

module.exports = router;
