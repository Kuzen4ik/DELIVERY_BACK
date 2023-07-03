const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { isUUIDFormatValid } = require("../utils/helpers");

const accessTokenSecret = process.env.ACCESS_TOKEN_PRIVATE_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_PRIVATE_KEY;

const saltRounds = 10;

const getAdminsAll = async () => {
  const admins = await Admin.findAll();
  const res = [];
  admins.forEach(({ id, email }) => {
    res.push({ id, email });
  });
  return res;
};

const login = async (email, password) => {
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new Error("Admin not found");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const payload = { id: admin.id, email };

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "2d",
    });
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "10s",
    });
    return {
      accessToken,
      refreshToken,
      admin: { id: admin.id, email: admin.email },
    };
  } catch (err) {
    throw new Error(err);
  }
};

const createAdmin = async (email, password) => {
  try {
    const existingAdmin = await Admin.findOne({ where: { email } });

    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });

    return { message: "Admin created successfully", admin: newAdmin };
  } catch (err) {
    throw new Error(err);
  }
};

const deleteAdmin = async (id) => {
  try {
    if (!isUUIDFormatValid(id)) {
      throw new Error("Invalid id format");
    }
    const admin = await Admin.findByPk(id);

    if (admin) {
      await admin.destroy();
      return { message: "Admin deleted successfully" };
    } else {
      throw new Error("Admin not found");
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getAdminsAll, login, createAdmin, deleteAdmin };
