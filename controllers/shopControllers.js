const db = require("../db/database");
const {
  createShop,
  getShopsAll,
  deleteShop,
} = require("../service/shopsService");

const getShopController = async (req, res) => {
  try {
    const shops = await getShopsAll();
    res.send(shops);
  } catch (err) {
    res.status(400).send(err?.message || err);
  }
};

const postShopController = async (req, res) => {
  try {
    const { name, address, createdBy } = req.body;
    const createdAt = String(new Date());

    if (!name || !address || !createdBy) {
      res
        .status(404)
        .send({ message: "Required fields: name, address, createdBy" });
      return;
    }

    const newShop = await createShop({ name, address, createdBy, createdAt });
    res.status(200).send({ message: "Success", shop: newShop });
  } catch (err) {
    res.status(400).send(err?.message || err);
  }
};

const deleteShopController = async (req, res) => {
  const { shopId } = req.params;
  if (!shopId) {
    res.status(404).send({ message: "Id field is required" });
    return;
  }

  try {
    await deleteShop(shopId);
    res.status(200).send("Success");
  } catch (err) {
    res.status(400).send(err?.message || err);
  }
};

module.exports = {
  postShopController,
  getShopController,
  deleteShopController,
};
