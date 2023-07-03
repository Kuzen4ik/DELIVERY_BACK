const Coupon = require("../models/coupon");

const getCouponsAll = async () => {
  const coupons = await Coupon.findAll();
  return coupons;
};

const getCouponByCode = async (code) => {
  const coupon = await Coupon.findOne({ where: { code } });
  if (!coupon) {
    throw new Error("Coupon not found");
  }
  return coupon;
};

const createCoupon = async (code, discount) => {
  if (+discount < 1 || +discount > 99) {
    throw new Error("Coupon must be between 1 and 99 percent");
  }
  const newCoupon = await Coupon.create({
    code,
    discount,
  });
  return newCoupon;
};

const deleteCoupon = async (code) => {
  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    throw new Error("Coupon not found");
  }
  await coupon.destroy();
};

module.exports = { getCouponsAll, getCouponByCode, createCoupon, deleteCoupon };
