const Shop = require("../models/shop");
const { isUUIDFormatValid } = require("../utils/helpers");

const getShopsAll = async () => {
  const shops = await Shop.findAll();
  return shops;
};

const createShop = async (data) => {
  const newShop = await Shop.create(data);
  return newShop;
};

const deleteShop = async (id) => {
  try {
    if (!isUUIDFormatValid(id)) {
      throw new Error("Invalid id format");
    }
    const shop = await Shop.findByPk(id);
    if (!shop) {
      throw new Error("Shop not found");
    } else {
      await shop.destroy();
      return { message: "Admin deleted successfully" };
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getShopsAll, createShop, deleteShop };
