const { Router } = require("express");
const {
  postShopController,
  getShopController,
  deleteShopController,
} = require("./controllers/shopControllers");
const {
  postMenuController,
  getMenuController,
  deleteMenuController,
} = require("./controllers/menuController");
const {
  postOrderController,
  getOrdersController,
} = require("./controllers/cartController");
const {
  getCouponsController,
  postCouponsController,
  deleteCouponController,
} = require("./controllers/couponsController");

const router = Router();

router.get("/shops", getShopController);
router.post("/shops", postShopController);
router.delete("/shops/:shopId", deleteShopController);

router.get("/menu/:shopId", getMenuController);
router.post("/menu/:shopId", postMenuController);
router.delete("/menu/:menuId", deleteMenuController);

router.post("/orders", postOrderController);
router.get("/orders", getOrdersController);

router.get("/coupons", getCouponsController);
router.post("/coupons", postCouponsController);
router.delete("/coupons/:code", deleteCouponController);

module.exports = router;
