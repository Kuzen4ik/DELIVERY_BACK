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
const {
  registerController,
  loginController,
} = require("./controllers/authControllers");
const { authenticate } = require("./auth/auth");

const router = Router();

router.get("/shops", getShopController);
router.post("/shops", postShopController);
router.delete("/shops/:shopId", deleteShopController);

router.get("/menu/:shopId", getMenuController);
router.post("/menu/:shopId", postMenuController);
router.delete("/menu/:menuId", deleteMenuController);

router.post("/orders", postOrderController);
router.get("/orders", authenticate, getOrdersController);

router.get("/coupons", getCouponsController);
router.post("/coupons", postCouponsController);
router.delete("/coupons/:code", deleteCouponController);

router.post("/auth/register", registerController);
router.post("/auth/login", loginController);

// router.post("/admins/login", loginController);
// router.get("/admins/register", logoutController);

module.exports = router;
