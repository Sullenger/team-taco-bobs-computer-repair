/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const crudApi = require("./routes/crud-api");
const authApi = require("./routes/auth-api");
const questionApi = require("./routes/question-crud-api");
const recoverApi = require("./routes/acc-recovery");
const purchaseHistoryApi = require("./routes/purchase-history-crud");
const repairServices = require("./routes/repair-services");
const roleBank = require("./routes/role-crud-api");
const invoices = require("./models/invoice");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));

app.use("/api", crudApi);
app.use("/auth/api", authApi);
app.use("/questions/api", questionApi);
app.use("/recovery/api", recoverApi);
app.use("/purchase-history/api", purchaseHistoryApi);
app.use("/purchases/api", repairServices);
app.use("/role-bank/api", roleBank);

// Global variables
const serverPort = process.env.PORT || 3000;

// Connection String

const connString =
  "mongodb+srv://user_208:bznXR3on@ems-nhomg.mongodb.net/Team-Taco?retryWrites=true";

/************************* Mongoose connection strings go below this line  ***************/

mongoose
  .connect(connString, {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true
  })
  .then(() =>
    console.debug("Connection to the Database instance was successful")
  )
  .catch(err => console.debug("MongoDB Error: " + err.message));

/************************* API routes go below this line ********************/

// Login User by

/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
