/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');


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
            message: "Authentication failed"
          });
        }
        fetchedUser = user;
        // compare user password input to hased password stored in DB
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Authentication failed"
          });
        }
        console.log(fetchedUser);
        // send generated web token to front-end
        res.status(200).json({
          userId: fetchedUser._id,
          name_first: fetchedUser.name_first
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Authentication failed"
        });
      });
  });

  module.exports = router;