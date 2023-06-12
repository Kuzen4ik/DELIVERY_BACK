const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes");
const compression = require("compression");
const varMiddleware = require("./middleware/variables");

const app = express();

const frontendDomain =
  process.env.REACT_APP_FRONTEND_DOMAIN || "http://localhost:3000";
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(compression());
app.use(varMiddleware);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendDomain);
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
