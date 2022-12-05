const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

// routes to connect
const authRoutes = require("./routes/auth-routes");
const petRoutes = require("./routes/pet-routes");
const userRoutes = require("./routes/user-routes");

//connect to MongoDB
const dbURI =
  "mongodb://" +
  process.env.MONGO_USERNAME +
  ":" +
  process.env.MONGO_PASSWORD +
  "@" +
  process.env.MONGO_URI +
  "/" +
  process.env.MONGO_TESTBED_DB +
  "?ssl=true&replicaSet=" +
  process.env.MONGO_REPLICA_SET +
  "&authSource=" +
  process.env.MONGO_AUTH_SOURCE;

mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, data) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

//express settings
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Psychic Cat now listening for requests on port ${port}`);
});
