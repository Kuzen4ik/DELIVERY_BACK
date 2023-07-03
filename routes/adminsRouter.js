const { Router } = require("express");
const { authenticate } = require("../middleware/authenticate");
const {
  getAdminsController,
  deleteAdminsByIdController,
} = require("../controllers/adminsControllers");

const router = Router();

router.get("/", getAdminsController);

router.delete("/:id", deleteAdminsByIdController);

module.exports = router;
