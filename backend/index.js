const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("./routes/routes");
const cors = require("cors");
const journalRoute = require("./routes/journalRoute")
const path  = require('path');
const connectDb = require("./config/connectDb")

const app = express();
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3200;
connectDb()
  
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")))
app.use(journalRoute);
app.use(route);
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`connnected at port no : ${port}`);
});
