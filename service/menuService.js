const Menu = require("../models/menu");
const { isUUIDFormatValid } = require("../utils/helpers");

const getMenuByShopId = async (shopId) => {
  if (!isUUIDFormatValid(shopId)) {
    throw new Error("Invalid id format");
  }

  console.log(1);
  const menu = await Menu.findAll();
  return menu;
};

const createMenu = async (data) => {
  const newMenu = await Menu.create(data);
  return newMenu;
};

const deleteMenu = async (id) => {
  try {
    if (!isUUIDFormatValid(id)) {
      throw new Error("Invalid id format");
    }
    const menu = await Menu.findByPk(id);
    if (!menu) {
      throw new Error("Menu not found");
    } else {
      await menu.destroy();
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getMenuByShopId, createMenu, deleteMenu };
