const db = require("../db/database");

const postCouponsController = async (req, res) => {
  const { code, discount } = req.body;

  try {
    db.run(
      "INSERT INTO coupons (code, discount) VALUES (?, ?)",
      [code, discount],
      function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err.message || err);
        }
        res.status(200).send({ status: "success" });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message || err);
  }
};

const getCouponsController = async (req, res) => {
  const { code } = req.query;

  try {
    if (code) {
      db.get("SELECT * FROM coupons WHERE code = ?", [code], (err, row) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err.message || err);
        }
        if (row) {
          res.status(200).json(row);
        } else {
          res.status(400).json("Not found");
        }
      });
    } else {
      db.all("SELECT * FROM coupons", (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error when receiving coupons");
        }
        res.status(200).json(rows);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message || err);
  }
};

const deleteCouponController = async (req, res) => {
  const { code } = req.params;

  try {
    db.run("DELETE FROM coupons WHERE code = ?", [code], function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err.message || err);
      }

      if (this.changes === 0) {
        return res.status(404).send(err.message || err);
      }

      res.status(200).send("Coupon removed successfully");
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message || err);
  }
};

module.exports = {
  postCouponsController,
  getCouponsController,
  deleteCouponController,
};
