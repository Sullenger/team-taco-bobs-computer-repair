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

const securityQuestion = require('../models/securityQuestion');

// Create Security Question
router.post("/question", function(req, res, next) {
  const question = {
    question: req.body.question
  };

  securityQuestion.create(question, function(err, questions) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(questions);
      res.json(questions);
    }
  });
});

// Find all Security Question
router.get("/question", function(req, res, next) {
  securityQuestion.find({}, function(err, questions) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(questions);
      res.json(questions);
    }
  });
});

module.exports = router;
