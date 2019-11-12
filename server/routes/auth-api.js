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

// ***************************************** //
// ************** USER LOGIN *************** //
// ***************************************** //

router.post("/login", (req, res, next) => {
  let fetchedUser;
  // find user by username
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Username or password are incorrect."
        });
      }
      fetchedUser = user;
      // compare user password input to hased password stored in DB
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Username or password are incorrect."
        });
      }
      // send generated web token to front-end
      res.status(200).json({
        userId: fetchedUser._id,
        name_first: fetchedUser.name_first,
        role: fetchedUser.roles
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Authentication failed"
      });
    });
});

router.get("/roles/:id", function(req, res, next) {
  User.findOne({ _id: req.params.id }, (err, role) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(role);
      res.json(role.roles);
    }
  });
});

module.exports = router;
