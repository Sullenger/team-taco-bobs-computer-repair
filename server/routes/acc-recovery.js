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
        questions: result.security_questions
      });
    }).catch( err => {
      return res.status(401).json({
        message: 'No user found in our system.'
      })
    })
  })

  module.exports = router;

