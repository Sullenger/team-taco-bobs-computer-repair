/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

const mongoose = require("mongoose");

let userRoles = mongoose.Schema({
  role: { type: String, default: "standard" }
});

let userAddress = mongoose.Schema({
  street_address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String }
});

let securityQuestions = mongoose.Schema({
  question_text: { type: String },
  user_answer: { type: String },
  question_text1: { type: String },
  user_answer1: { type: String },
  question_text2: { type: String },
  user_answer2: { type: String }
});

let userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, dropDups: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    name_first: { type: String },
    name_last: { type: String },
    phone_number: { type: String },
    roles: [userRoles],
    address: [userAddress],
    security_questions: [securityQuestions],
    date_created: { type: Date, default: new Date() },
    date_updated: { type: Date, default: new Date() }
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
