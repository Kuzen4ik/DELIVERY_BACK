const { Router } = require("express");
const {
  postOrderController,
  getOrdersController,
} = require("../controllers/cartController");

const router = Router();

router.post("/", postOrderController);

router.get("/", getOrdersController);

module.exports = router;
