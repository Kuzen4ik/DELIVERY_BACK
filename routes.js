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
  getAdminsController,
  deleteAdminsController,
} = require("./controllers/authControllers");
const { authenticate } = require("./auth/auth");

const router = Router();

router.get("/shops", getShopController);
router.post("/shops", authenticate, postShopController);
router.delete("/shops/:shopId", authenticate, deleteShopController);

router.get("/menu/:shopId", getMenuController);
router.post("/menu/:shopId", authenticate, postMenuController);
router.delete("/menu/:menuId", authenticate, deleteMenuController);

router.post("/orders", postOrderController);
router.get("/orders", getOrdersController);

router.get("/coupons", getCouponsController);
router.post("/coupons", authenticate, postCouponsController);
router.delete("/coupons/:code", deleteCouponController);

router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
router.get("/admins", authenticate, getAdminsController);
router.delete("/admins/:id", authenticate, deleteAdminsController);

module.exports = router;
