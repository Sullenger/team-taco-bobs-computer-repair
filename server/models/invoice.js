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
  user_id: { type: String },
  services_ordered: { type: Object },
  order_snapshot: { type: Object },
  total: { type: String },
  hours: {type: String},
  parts: { type: String }
}, { collection: "invoices" });

module.exports = mongoose.model("Invoice", invoiceSchema);
