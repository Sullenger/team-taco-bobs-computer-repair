/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

// Create user
router.post("/users/registration", function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      if (!user) {
        // hash password first
        bcrypt.hash(req.body.password, 10).then(hash => {
          let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            name_first: req.body.name_first,
            name_last: req.body.name_last,
            phone_number: req.body.phone_number,
            roles: req.body.roles,
            address: req.body.address,
            security_questions: req.body.security_questions,
            date_created: req.body.dateCreated,
            date_updated: req.body.dateUpdated
          });

          //save user to DB
          user.save().then(result => {
            res.status(201).json({
              message: "user created!",
              result: result
            });
          });
        });
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

// Find all users
router.get("/users", function(req, res, next) {
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
router.get("/users/:id", function(req, res, next) {
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

// Update user by id
router.put("/users/:id", function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      user.set({
        username: req.body.username,
        email: req.body.email,
        name_first: req.body.name_first,
        name_last: req.body.name_last,
        phone_number: req.body.phone_number,
        address: req.body.address,
        roles: req.body.roles,
        date_updated: new Date()
      });
      user.save(function(err, updatedUser) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(updatedUser);
          res.json(updatedUser);
        }
      });
    }
  });
});

// delete user by id
router.delete("/users/:id", function(req, res, next) {
  User.findByIdAndDelete({ _id: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      res.json(user);
    }
  });
});

// find users security questions/answers by user id

router.get("/security-questions/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      res.status(401).send(console.log("No User Found!"));
    } else {
      res.status(201).json({
        user: user.security_questions
      });
    }
    // console.log(user.security_questions);
  });
});

router.put("/edit/security-questions/:id", (req, res, next) => {
  const newSecurity = new User({
    _id: req.params.id,
    security_questions: req.body.security_questions
  });
  User.updateOne({ _id: req.params.id }, newSecurity).then(result => {
    console.log(result);
    res
      .status(200)
      .json({ message: "security questions successfully updated." });
  });
});

module.exports = router;
