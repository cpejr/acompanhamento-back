require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => {
  console.log("API running on port " + port + "!");
});

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
