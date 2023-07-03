const { Router } = require("express");
const {
  registerController,
  loginController,
  postRefreshController,
} = require("../controllers/authControllers");

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/refresh", postRefreshController);

module.exports = router;
