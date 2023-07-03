const { Router } = require("express");
const {
  getCouponsController,
  postCouponsController,
  deleteCouponController,
} = require("../controllers/couponsController");
const { authenticate } = require("../middleware/authenticate");

const router = Router();

router.get("/", getCouponsController);

router.post("/", postCouponsController);

router.delete("/:code", deleteCouponController);

module.exports = router;
