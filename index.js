const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const routes = require("./routes");
const compression = require("compression");

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use(express.static("static"));
app.use(fileUpload({}));

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
