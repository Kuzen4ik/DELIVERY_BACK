const express = require("express");
const fileUpload = require("express-fileupload");
// const client = require("./connection.js");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes/index");
const compression = require("compression");
const bodyParser = require("body-parser");
const { client } = require("./connection");
// const varMiddleware = require("./middleware/variables");

const app = express();

const frontendDomain =
  process.env.REACT_APP_FRONTEND_DOMAIN || "http://localhost:3000";
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(compression());
// app.use(varMiddleware);

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

client.connect();

// app.get("/api/admins", (req, res) => {
//   client.query(`Select * from admins`, (err, result) => {
//     if (!err) {
//       res.send(result.rows);
//     }
//   });
//   client.end;
// });

// app.get("/api/admins/:id", (req, res) => {
//   client.query(
//     `Select * from admins where id=${req.params.id}`,
//     (err, result) => {
//       if (!err) {
//         res.send(result.rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
//   client.end;
// });

// app.post("/api/admins", (req, res) => {
//   const admin = req.body;
//   console.log(admin);
//   let insertQuery = `insert into admins(id, email, password)
//                      values(${admin.id}, '${admin.email}', '${admin.password}')`;

//   client.query(insertQuery, (err, result) => {
//     if (!err) {
//       res.send("Insertion was successful");
//       console.log(result);
//     } else {
//       console.log(err?.message);
//     }
//   });
//   client.end;
// });

// app.put("/api/admins/:id", (req, res) => {
//   const admin = req.body;
//   let updateQuery = `update admins
//                      set password = '${admin.password}',
//                      email = '${admin.email}'
//                      where id = ${req.params.id}`;

//   client.query(updateQuery, (err, result) => {
//     if (!err) {
//       res.send("Update was successful");
//       console.log(result);
//     } else {
//       console.log(err?.message);
//     }
//   });
//   client.end;
// });

// app.delete("/api/admins/:id", (req, res) => {
//   let insertQuery = `delete from admins where id=${req.params.id}`;

//   client.query(insertQuery, (err, result) => {
//     if (!err) {
//       res.send("Deletion was successful");
//     } else {
//       console.log(err?.message);
//     }
//   });
//   client.end;
// });

// client.connect();

// postgres nodejs
