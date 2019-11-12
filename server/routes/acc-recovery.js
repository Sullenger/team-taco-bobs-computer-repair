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

// find security questions by username

router.post("/questions", (req, res, next) => {
  console.log(req);
  User.findOne({ username: req.body.username })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "No user with that username found in our system."
        });
      }
      res.status(201).json({
        result
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "No user found in our system."
      });
    });
});

router.put("/update/:id", function(req, res, next) {
  User.findOne({ username: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      bcrypt.hash(req.body.password, 10).then(hash => {
        user.set({
          password: hash
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
      });
    }
  });
});

module.exports = router;
