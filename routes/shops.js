const { Router } = require("express");
const {
  postShopController,
  getShopController,
} = require("../controllers/shopControllers");
const {
  postMenuController,
  getMenuController,
} = require("../controllers/menuController");

const router = Router();

router.get("/shops", getShopController);
router.post("/shops", postShopController);

router.post("/menu/:shopId", postMenuController);
router.get("/menu/:shopId", getMenuController);

module.exports = router;
