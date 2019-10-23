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
  role: { type: String, default: "standard"}
})

let userAddress = mongoose.Schema({
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String }
})

let securityQuestions = mongoose.Schema({
  questionId: { type: String },
  userAnswer: { type: String }
})

let invoices = mongoose.Schema({
  date: { type: String },
  servicesOrdered: { type: String },
  total: {type: String }
})

let userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, dropDups: true },
  email: { type: String, unique:true },
  password: { type: String, required:true },
  nameFirst: { type: String },
  nameLast: { type: String },
  phoneNumber: { type: String },
  roles: [userRoles],
  address: [userAddress],
  securityQuestions: [securityQuestions],
  invoices: [invoices],
  dateCreated: { type: Date, default: new Date() },
  dateUpdated: { type: Date },
})

module.exports = mongoose.model("User", userSchema);
