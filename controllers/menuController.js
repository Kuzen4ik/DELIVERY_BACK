const db = require("../db/database");
const { getMenuByShopId } = require("../service/menuService");
const { saveImage } = require("../utils/helpers");

const getMenuController = async (req, res) => {
  const { shopId } = req.params;

  try {
    const menu = await getMenuByShopId(shopId);
    res.status(200).send(menu);
  } catch (err) {
    console.log(err);
    res.status(400).send(err?.message || err);
  }

  // db.all("SELECT * FROM menu WHERE shopId = ?", [shopId], (err, rows) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send(err?.message || err);
  //   } else {
  //     res.status(200).json(rows);
  //   }
  // });
};

const postMenuController = async (req, res) => {
  const { shopId } = req.params;
  const { name, price } = req.body;

  // try {
  //   await cre
  // } catch (err) {
  //   console.log(err);
  // }

  // try {
  //   const image = await saveImage(req.files.image);
  //   const createdAt = String(new Date());
  //   db.run(
  //     "INSERT INTO menu (shopId, name, price, image, createdAt) VALUES (?, ?, ?, ?, ?)",
  //     [shopId, name, price, image, createdAt],
  //     (err) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send(err?.message || err);
  //       } else {
  //         db.get(
  //           "SELECT * FROM menu WHERE id = last_insert_rowid()",
  //           (err, row) => {
  //             if (err) {
  //               console.log(err);
  //               res.status(500).send(err?.message || err);
  //             } else {
  //               res.status(200).json(row);
  //             }
  //           }
  //         );
  //       }
  //     }
  //   );
  // } catch (err) {
  //   console.log(err);
  //   res.status("500").send(err);
  // }
};

const deleteMenuController = async (req, res) => {
  const { menuId } = req.params;

  try {
    db.run("DELETE FROM menu WHERE id = ?", menuId, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err?.message || err);
      }

      res.status(200).send("Success");
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err?.message || err);
  }
};

module.exports = {
  postMenuController,
  getMenuController,
  deleteMenuController,
};
