const db = require("../db/database");

const postShopController = async (req, res) => {
  try {
    const { name, address, createdBy } = req.body;
    const createdAt = String(new Date());

    db.run(
      "INSERT INTO shops (name, address, createdAt, createdBy) VALUES (?, ?, ?, ?)",
      [name, address, createdAt, createdBy],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Ошибка при добавлении магазина");
        }
        res.status(200).send("Магазин успешно добавлен");
      }
    );
  } catch (err) {
    res.status(400).send(err.massage || err);
  }
};

const getShopController = async (req, res) => {
  db.all("SELECT * FROM shops", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Ошибка при получении списка магазинов");
    }

    res.status(200).json(rows);
  });
};

module.exports = { postShopController, getShopController };
