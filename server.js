const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const logger = require("morgan");
//const Data = require("./data");

const API_PORT = 8000;
const app = express();
app.use(cors());
const router = express.Router();

// this is the MongoDB database-- mLab/atlas -- To Do:
const dbRoute =
  //"mongodb+srv://Chris:<password>@veganmeet-fbab9.mongodb.net/test";
  "mongodb+srv://Chris:deejay20@veganmeet-fbab9.mongodb.net/test?retryWrites=true&w=majority";
// connects backend code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the databse"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//app.use("api, router");
// (optional) only made for logging and bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(logger("dev"));
require("./routes")(app);
/*
// this is the get method that fetches all available data in the database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is the update method to overwrite existing data in the database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this delete method removes existing data from the database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this create method adds new data to the database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
*/
// append /api for http requests
//app.use("/api, router");

// launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
