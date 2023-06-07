const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static("static"));
app.use(fileUpload({}));

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
