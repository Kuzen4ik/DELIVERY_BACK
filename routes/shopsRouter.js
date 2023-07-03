const { Router } = require("express");
const {
  getShopController,
  postShopController,
  deleteShopController,
} = require("../controllers/shopControllers");
const { authenticate } = require("../middleware/authenticate");
const router = Router();

router.get("/", getShopController);
router.post("/", postShopController);
router.delete("/:shopId", deleteShopController);

module.exports = router;
