const { getAdminsAll, deleteAdmin } = require("../service/adminsService");

const getAdminsController = async (req, res) => {
  try {
    const admins = await getAdminsAll();
    res.json(admins);
  } catch (err) {
    res.status(400).send({ message: "Internal server error", err });
  }
};

const deleteAdminsByIdController = async (req, res) => {
  if (!req.params.id) {
    res.status(404).send({ message: "Id field is required" });
    return;
  }
  try {
    await deleteAdmin(req.params.id);
    res.send({ message: "Admin successfully deleted" });
  } catch (err) {
    let message = "Internal server error";
    if (err?.message || err) {
      message = err?.message || err;
    }

    res.status(400).send({ message });
  }
};

module.exports = { getAdminsController, deleteAdminsByIdController };
