const jwt = require("jsonwebtoken");
const { createAdmin, login } = require("../service/adminsService");

const accessTokenSecret = process.env.ACCESS_TOKEN_PRIVATE_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_PRIVATE_KEY;

const registerController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const newAdmin = await createAdmin(email, password);
    res.send(newAdmin);
  } catch (err) {
    let message = "Internal server error";
    if (err?.message || err) {
      message = err?.message || err;
    }

    res.status(400).send({ message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await login(email, password);
    res.send(result);
  } catch (err) {
    let message = "Internal server error";
    if (err?.message || err) {
      message = err?.message || err;
    }

    res.status(400).send({ message });
  }
};

const postRefreshController = (req, res) => {
  const { refresh } = req.body;
  if (!refresh) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refresh, refreshTokenSecret);

    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      accessTokenSecret,
      {
        expiresIn: "30s",
      }
    );

    res.status(200).send({
      access: accessToken,
      admin: { id: decoded.id, email: decoded.email },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = {
  registerController,
  loginController,
  postRefreshController,
};
