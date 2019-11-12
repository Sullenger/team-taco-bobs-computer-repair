/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

const mongoose = require("mongoose");

let lineItemSchema = mongoose.Schema({
  passwordReset: { type: Number, default: 0 },
  spywareRemoval: { type: Number, default: 0 },
  ramUpgrade: { type: Number, default: 0 },
  softwareInstallation: { type: Number, default: 0 },
  tuneUp: { type: Number, default: 0 },
  keyboardCleaning: { type: Number, default: 0 },
  diskCleanup: { type: Number, default: 0 }
});

let purchaseHistorySchema = mongoose.Schema({
  items: [lineItemSchema]
});

module.exports = mongoose.model("PurchaseHistory", purchaseHistorySchema);
