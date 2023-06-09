const db = require("../db/database");
const jwt = require("jsonwebtoken");

const registerController = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const checkQuery = "SELECT * FROM admins WHERE email = ?";
  db.get(checkQuery, [email], (error, row) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (row) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    const insertQuery = "INSERT INTO admins (email, password) VALUES (?, ?)";
    db.run(insertQuery, [email, password], function (error) {
      if (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(201).json({ message: "Admin registered successfully" });
    });
  });
};

const loginController = (req, res) => {
  const { email, password } = req.body;

  // Проверяем, что оба поля заполнены
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Проверяем, что администратор с таким email существует
  const query = "SELECT * FROM admins WHERE email = ?";
  db.get(query, [email], (error, row) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!row) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Проверяем пароль
    if (!row.password) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (password !== row.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // bcrypt.compare(password, row.password, (err, result) => {
    //   if (err) {
    //   }
    //   if (!result) {
    //   }

    // Создаем JSON Web Token (JWT)
    const token = jwt.sign({ email: row.email }, "your-secret-key", {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
    // });
  });
};

module.exports = { registerController, loginController };
