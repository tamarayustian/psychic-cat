const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

//connect to MongoDB
mongoose.connect(
  process.env.MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err, data) => {
    if (err) throw err;
    console.log("connected to MongoDB");
  }
);

//express settings
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));

//routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App now listening for requests on port ${port}`);
});
