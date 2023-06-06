const db = require("../db/database");
const { saveImage } = require("../utils/halpers");

const postMenuController = async (req, res) => {
  const { shopId } = req.params;
  const { name, price } = req.body;

  try {
    const image = await saveImage(req.files.image);
    const createdAt = String(new Date());
    db.run(
      "INSERT INTO menu (shopId, name, price, image, createdAt) VALUES (?, ?, ?, ?, ?)",
      [shopId, name, price, image, createdAt],
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          db.get(
            "SELECT * FROM menu WHERE id = last_insert_rowid()",
            (err, row) => {
              if (err) {
                console.log(err);
                res.status(500).send(err);
              } else {
                res.status(200).json(row);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status("500").send(err);
  }
};

const getMenuController = async (req, res) => {
  const { shopId } = req.params;
  console.log(req.params);

  db.all("SELECT * FROM menu WHERE shopId = ?", [shopId], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error getting menu items");
    } else {
      console.log(rows);
      res.status(200).json(rows);
    }
  });
};

module.exports = { postMenuController, getMenuController };
