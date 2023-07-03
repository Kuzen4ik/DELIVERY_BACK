const { Router } = require("express");
const shopsRouter = require("./shopsRouter");
const menuRoutes = require("./menuRouter");
const ordersRouter = require("./ordersRouter");
const couponsRouter = require("./couponsRouter");
const authRouter = require("./authRouter");
const adminsRouter = require("./adminsRouter");

const router = Router();

router.use("/shops", shopsRouter);

router.use("/menu", menuRoutes);

router.use("/orders", ordersRouter);

router.use("/coupons", couponsRouter);

router.use("/auth", authRouter);

router.use("/admins", adminsRouter);

module.exports = router;
