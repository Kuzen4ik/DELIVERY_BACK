const db = require("../db/database");

const postOrderController = async (req, res) => {
  const { shopId, items, userEmail, address, phone, price } = req.body;
  const createdAt = String(new Date());

  const itemsStf = JSON.stringify(items);

  try {
    db.run(
      "INSERT INTO orders (shopId, items, userEmail, createdAt, address, phone, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [shopId, itemsStf, userEmail, createdAt, address, phone, price],
      function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err?.message || err);
        }

        const orderId = this.lastID;
        const newOrder = {
          id: orderId,
          shopId,
          items,
          userEmail,
          createdAt,
          address,
          phone,
          price,
        };

        res.status(200).json(newOrder);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err?.message || err);
  }
};

const getOrdersController = async (req, res) => {
  const { email, phone } = req.query;

  try {
    let query = "SELECT * FROM orders";
    const params = [];

    if (email || phone) {
      query += " WHERE";

      if (email) {
        query += " userEmail = ?";
        params.push(email);
      }

      if (phone) {
        if (email) {
          query += " AND";
        }
        query += " phone = ?";
        params.push(phone);
      }
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).send(err?.message || err);
      }
      res.status(200).json(rows);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err?.message || err);
  }
};

module.exports = { postOrderController, getOrdersController };
