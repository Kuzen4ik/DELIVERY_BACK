const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("food_delivery.db");

db.run(`
  CREATE TABLE IF NOT EXISTS shops (
    id INTEGER PRIMARY KEY,
    name TEXT,
    address TEXT,
    createdAt TEXT,
    createdBy TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY,
    shopId INTEGER,
    name TEXT,
    price REAL,
    image TEXT,
    createdAt TEXT,
    FOREIGN KEY (shopId) REFERENCES shops(id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    shopId INTEGER,
    items TEXT,
    userEmail TEXT,
    createdAt TEXT,
    address TEXT,
    phone TEST,
    price REAL,
    FOREIGN KEY (shopId) REFERENCES shops(id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY,
    code TEXT UNIQUE,
    discount REAL
  )
`);

db.run(`
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)
`);

// db.close();

module.exports = db;
