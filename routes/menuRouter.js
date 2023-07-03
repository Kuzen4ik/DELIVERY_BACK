const { Router } = require("express");
const {
  getMenuController,
  postMenuController,
  deleteMenuController,
} = require("../controllers/menuController");
const { authenticate } = require("../middleware/authenticate");

const router = Router();

router.get("/:shopId", getMenuController);
router.post("/:shopId", authenticate, postMenuController);
router.delete("/:menuId", authenticate, deleteMenuController);

module.exports = router;
