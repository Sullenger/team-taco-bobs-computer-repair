/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

const mongoose = require("mongoose");

let invoiceSchema = mongoose.Schema({
  date: { type: Date, default: new Date() },
  username: { type: String },
  services_ordered: { type: String },
  total: { type: String }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
