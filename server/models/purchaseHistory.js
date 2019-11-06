/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

const mongoose = require("mongoose");

let purchaseHistorySchema = mongoose.Schema({
  firstItem: { type: Number, default: 0 },
  secondItem: { type: Number, default: 0 },
  thirdItem: { type: Number, default: 0 },
  fourthItem: { type: Number, default: 0 },
});

module.exports = mongoose.model("PurchaseHistory", purchaseHistorySchema);
