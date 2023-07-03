const {
  getCouponByCode,
  getCouponsAll,
  deleteCoupon,
  createCoupon,
} = require("../service/couponsService");

const postCouponsController = async (req, res) => {
  const { code, discount } = req.body;

  try {
    const newCoupon = await createCoupon(code, discount);
    res.status(200).send({ status: "success", coupon: newCoupon });
  } catch (err) {
    res.status(400).send({ message: err?.message || err });
  }
};

const getCouponsController = async (req, res) => {
  const { code } = req.query;

  try {
    if (code) {
      const coupon = await getCouponByCode(code);
      res.send(coupon);
    } else {
      const coupons = await getCouponsAll();
      res.send(coupons);
    }
  } catch (err) {
    res.status(400).send({ message: err?.message || err });
  }
};

const deleteCouponController = async (req, res) => {
  const { code } = req.params;

  try {
    await deleteCoupon(code);
    res.status(200).send("Coupon removed successfully");
  } catch (err) {
    res.status(400).send({ message: err?.message || err });
  }
};

module.exports = {
  postCouponsController,
  getCouponsController,
  deleteCouponController,
};
