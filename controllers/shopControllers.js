const db = require("../db/database");

const getShopController = async (req, res) => {
  db.all("SELECT * FROM shops", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(err.massage || err);
    }

    res.status(200).json(rows);
  });
};

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
          return res.status(500).send(err.massage || err);
        }
        res.status(200).send("Success");
      }
    );
  } catch (err) {
    res.status(400).send(err.massage || err);
  }
};

const deleteShopController = async (req, res) => {
  const { shopId } = req.params;

  try {
    db.run("DELETE FROM shops WHERE id = ?", shopId, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err.massage || err);
      }

      db.run("DELETE FROM menu WHERE shopId = ?", shopId, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err.massage || err);
        }

        res.status(200).send("Success");
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message || err);
  }
};

module.exports = {
  postShopController,
  getShopController,
  deleteShopController,
};
