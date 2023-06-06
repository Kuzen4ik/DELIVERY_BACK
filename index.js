const express = require("express");
const fileUpload = require("express-fileupload");
const db = require("./db/database");
const shopsRoutes = require("./routes/shops");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.static("static"));
app.use(fileUpload({}));

app.use("/api", shopsRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
