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
const bcrypt = require('bcrypt');

const User = require('../models/user')

// find security questions by username

router.post('/questions', (req, res, next) => {
  console.log(req);
    User.findOne({ username: req.body.username }).then(result => {
      if(!result){
        return res.status(401).json({
          message: "No questions found",
        });
      }
      res.status(201).json({
          result
      });
    }).catch( err => {
      return res.status(401).json({
        message: 'No user found in our system.'
      })
    })
  })

  router.put("/update/:id", function(req, res, next) {
    User.findOne({ username: req.params.id }, function(err, user) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(user);
        bcrypt.hash(req.body.password, 10).then(hash => {
        user.set({
          password: hash,
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

  // router.put('/update/:username', (req, res, next) => {
  //   User.findOne({ username: req.params.username }), (err, newPass) => {
  //     if(err){
  //       console.log(err);
  //       return next(err);
  //     } else {
  //       console.log(newPass)
  //       // bcrypt.hash(req.body.password, 10).then(hash => {
  //         newPass.set({
  //           username: req.body.username,
  //           email: req.body.email,
  //           password: req.body.password,
  //           name_first: req.body.name_first,
  //           name_last: req.body.name_last,
  //           phone_number: req.body.phone_number,
  //           address: req.body.address,
  //           roles: req.body.roles,
  //           date_updated: new Date()
  //         });
  //       // });
  //       user.save((err, updatedPassword) => {
  //         if(err){
  //           console.log(error)
  //         } else {
  //           console.log(updatedPassword)
  //           res.json(updatedPassword)
  //         }
  //       })
  //     }
  //   }
  // })



  module.exports = router;

