const sqlite3 = require("sqlite3").verbose();

// Создаем соединение с базой данных
const db = new sqlite3.Database("food_delivery.db");

// Создаем таблицу магазинов
db.run(`
  CREATE TABLE IF NOT EXISTS shops (
    id INTEGER PRIMARY KEY,
    name TEXT,
    address TEXT,
    createdAt TEXT,
    createdBy TEXT
  )
`);

// Создаем таблицу меню
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

// Создаем таблицу заказов
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    shopId INTEGER,
    email TEXT,
    name TEXT,
    phone TEXT,
    FOREIGN KEY (shopId) REFERENCES shops(id)
  )
`);

// Создаем таблицу истории заказов
db.run(`
  CREATE TABLE IF NOT EXISTS order_history (
    id INTEGER PRIMARY KEY,
    orderId INTEGER,
    menuId INTEGER,
    quantity INTEGER,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (menuId) REFERENCES menu(id)
  )
`);

// Закрываем соединение с базой данных
// db.close();

module.exports = db;
