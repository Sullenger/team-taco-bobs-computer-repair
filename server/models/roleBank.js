/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/
const mongoose = require("mongoose");

let roleBankSchema = mongoose.Schema({
  role: { type: String }
});

module.exports = mongoose.model("roleBank", roleBankSchema);
