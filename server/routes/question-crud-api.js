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

const SecurityQuestion = require("../models/securityQuestion");

// Create Security Question
router.post("/question", function(req, res, next) {
  SecurityQuestion.create({ question: req.body.question }, function(
    err,
    questions
  ) {
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
  SecurityQuestion.find({}, function(err, questions) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(questions);
      res.json(questions);
    }
  });
});

// Find Security Question by id
router.get("/question/:id", function(req, res, next) {
  SecurityQuestion.findOne({ _id: req.params.id }, function(err, question) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(question);
      res.json(question);
    }
  });
});

// Update security question by id
router.put("/question/:id", function(req, res, next) {
  SecurityQuestion.findOne({ _id: req.params.id }, function(err, question) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(question);
      question.set({ question: req.body.question });
      question.save(function(err, updatedSecurityQuestion) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(updatedSecurityQuestion);
          res.send({
            message: "update success"
          });
        }
      });
    }
  });
});

// delete security question by id
router.delete("/question/:id", function(req, res, next) {
  SecurityQuestion.findByIdAndDelete({ _id: req.params.id }, function(
    err,
    question
  ) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(question);
      res.json(question);
    }
  });
});

module.exports = router;
