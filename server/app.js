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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("./models/user");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));

// Global variables
const serverPort = 3000;

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

// Create user
app.post("/api/users/registration", function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      if (!user) {

        // hash password first
        bcrypt.hash(req.body.password, 10).then(hash => {

          let user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            name_first: req.body.name_first,
            name_last: req.body.name_last,
            phone_number: req.body.phone_number,
            roles: req.body.roles,
            address: req.body.address,
            security_questions: req.body.security_questions,
            invoices: req.body.invoices,
            date_created: req.body.dateCreated,
            date_updated: req.body.dateUpdated
          });
          
          //save user to DB
          user.save().then( result => {
            res.status(201).json({
              message: "user created!",
              result: result
            });
          });
        })
        
        // User.create(user, function(req, res, next) {
        //   if (err) {
        //     console.log(err);
        //     return next(err);
        //   } else {
        //     console.log(newUser);
        //     res.json(newUser);
        //   }
        // });

      } else {
        console.log("Username Unavailable");
        res.status(500).send({
          text: "Username Unavailable",
          time_stamp: new Date()
        });
      }
    }
  });
});

// ***************************************** //
// ************** USER LOGIN *************** //
// ***************************************** //

app.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(!user) {
      res.status(401).json({
        message: "authentication failed"
      });
      return bcrypt.compare(req.body.password, user.password);
    } else if (err) {
      console.log(err);
    } else {
      res.status(200).send({
        name_first: user.name_first,
        id: user._id
      })
    }
  })
})

// app.post("/login", (req, res, next) => {
//   let fetchedUser;
//   // find user by username
//   User.findOne({ username: req.body.username })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({
//           message: "Authentication failed"
//         });
//       }
//       fetchedUser = user;
//       // compare user password input to hased password stored in DB
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then(result => {
//       if (!result) {
//         return res.status(401).json({
//           message: "Authentication failed"
//         });
//       }
//       // if username and password are authenticated generate json web token
//       const token = jwt.sign(
//         { email: fetchedUser.email, userId: fetchedUser._id },
//         "tokenKey",
//         { expiresIn: "4h" }
//       );
//       console.log(fetchedUser);
//       // send generated web token to front-end
//       res.status(200).json({
//         token: token,
//         userId: fetchedUser._id,
//         expiresIn: 3600
//       });
//     })
//     .catch(err => {
//       return res.status(401).json({
//         message: "Authentication failed"
//       });
//     });
// });

// Find all users
app.get("/api/users", function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(users);
      res.json(users);
    }
  });
});

// Find by User Id
app.get("/api/users/:id", function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      res.json(user);
    }
  });
});

// Login User by 

/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
